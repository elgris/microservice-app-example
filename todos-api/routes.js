'use strict';
module.exports = function (app) {
  var todoList = require('./todoController');

  app.route('/todos')
    .get(todoList.list)
    .post(todoList.create);


  app.route('/todos/:taskId')
    .get(todoList.get)
    .put(todoList.update)
    .delete(todoList.delete);
};