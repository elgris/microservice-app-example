'use strict';
const TodoControllerSql = require('./todoControllerSql');
module.exports = function (app, {tracer, redisClient, logChannel}) {
  const todoController = new TodoControllerSql({tracer, redisClient, logChannel});
  app.route('/todos')
    .get(function(req,resp) {return todoController.list(req,resp)})
    .post(function(req,resp) {return todoController.create(req,resp)});

  app.route('/todos/:taskId')
    .delete(function(req,resp) {return todoController.delete(req,resp)});
};