'use strict';
var cache = require('memory-cache'),
    redis = require("redis"),
    logChannel = process.env.REDIS_CHANNEL || 'log_channel',
    client = redis.createClient({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
    });

var OPERATION_CREATE = 'CREATE',
    OPERATION_DELETE = 'DELETE';

// TODO: these functions are not concurrent-safe
exports.list = function (req, res) {
    const data = getTodoData(req.user.username)

    res.json(data.items)
};

exports.create = function (req, res) {
    // TODO: must be transactional and protected for concurrent access, but
    // the purpose of the whole example app it's enough
    const data = getTodoData(req.user.username)
    const todo = {
        content: req.body.content,
        id: data.lastInsertedID
    }
    data.items[data.lastInsertedID] = todo

    data.lastInsertedID++
    setTodoData(req.user.username, data)

    logOperation(OPERATION_CREATE, req.user.username, todo.id)
    
    res.json(todo)
};

exports.delete = function (req, res) {
    const data = getTodoData(req.user.username)
    const id = req.params.taskId
    delete data.items[id]
    setTodoData(req.user.username, data)

    logOperation(OPERATION_DELETE, req.user.username, id)

    res.status(204)
    res.send()
};

function logOperation (opName, username, todoId) {
    client.publish(logChannel, JSON.stringify({
        opName: opName,
        username: username,
        todoId: todoId,
    }))
}

function getTodoData (userID) {
    var data = cache.get(userID)
    if (data == null) {
        data = {
            items: {
                '1': {
                    id: 1,
                    content: "Create new todo",
                },
                '2': {
                    id: 2,
                    content: "Update me",
                },
                '3': {
                    id: 3,
                    content: "Delete example ones",
                }
            },
            lastInsertedID: 3
        }

        setTodoData(userID, data)
    }
    return data
}

function setTodoData (userID, data) {
    cache.put(userID, data)
}
