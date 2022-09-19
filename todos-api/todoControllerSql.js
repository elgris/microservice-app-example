'use strict';
const cache = require('memory-cache');
const {Annotation, 
    jsonEncoder: {JSON_V2}} = require('zipkin');
const SqlClient = require('./sqlClient');

const OPERATION_CREATE = 'CREATE',
      OPERATION_DELETE = 'DELETE';

class TodoControllerSql {
    constructor({tracer, redisClient, logChannel}) {
        this._tracer = tracer;
        this._redisClient = redisClient;
        this._logChannel = logChannel;
    }

    // TODO: these methods are not concurrent-safe
    list (req, res) {
        const client = this._getSqlClient(req.user.userID)
        res.json(client.list())
    }

    create (req, res) {
        // TODO: must be transactional and protected for concurrent access, but
        // the purpose of the whole example app it's enough
        const client = this._getSqlClient(req.user.username)
        var id = client.getNextID()
        const todo = {
            content: req.body.content,
            id: id
        }
        client.create(todo)
        this._setSqlClient(req.user.username, client)
        this._logOperation(OPERATION_CREATE, req.user.username, id)
        
        res.json(todo)
    }

    delete (req, res) {
        const client = this._getSqlClient(req.user.username)
        client.delete(req.params.taskId)
        this._setSqlClient(req.user.username, client)

        this._logOperation(OPERATION_DELETE, req.user.username, req.params.taskId)

        res.status(204)
        res.send()
    }

    _logOperation (opName, username, todoId) {
        this._tracer.scoped(() => {
            const traceId = this._tracer.id;
            this._redisClient.publish(this._logChannel, JSON.stringify({
                zipkinSpan: traceId,
                opName: opName,
                username: username,
                todoId: todoId,
            }))
        })
    }

    
    _getSqlClient (userID) {
        var client = cache.get(userID)
        if (client == null) {
            client = new SqlClient(userID);
            this._setSqlClient(userID, client)
        }
        return client
    }

    _setSqlClient (userID, client) {
        cache.put(userID, client)
    }
}

module.exports = TodoControllerSql