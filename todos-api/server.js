const express = require('express')
const jwt = require('express-jwt');

const routes = require('./routes')

const port = process.env.TODO_API_PORT || 8082;
const jwtSecret = process.env.JWT_SECRET || "myfancysecret";
const app = express()

app.use(jwt({ secret: jwtSecret }))
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: 'invalid token' });
  }
});

routes(app)

app.listen(port, function () {
  console.log('todo list RESTful API server started on: ' + port)
})
