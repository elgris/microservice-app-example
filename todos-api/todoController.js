'use strict';
var cache = require('memory-cache');

// TODO: these functions are not concurrent-safe
exports.list = function (req, res) {
    const data = getTodoData(req.user.id)

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

    data.lastInsertedID++

    data.items[data.lastInsertedID] = todo
    setTodoData(req.user.id, data)

    res.json(todo)
};

exports.get = function (req, res) {
    const data = getTodoData(req.user.id)
    const id = req.path.id
    todo = data.items[id]
    if (todo == null) {
        return res.status(404).send({
            message: 'No user found'
        })
    }

    res.json(todo)
};

exports.update = function (req, res) {
    const data = getTodoData(req.user.id)
    const id = req.path.id
    todo = data.items[id]
    if (todo == null) {
        return res.status(404).send({
            message: 'No todo record found'
        })
    }

    todo.content = req.body.content
    data.items[id] = todo
    setTodoData(req.user.id, data)

    res.json(todo)
};

exports.delete = function (req, res) {
    const data = getTodoData(req.user.id)
    const id = req.path.id //????
    data.items.delete(id)
    setTodoData(req.user.id, data)

    return res.status(204)
};

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
