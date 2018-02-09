const express = require('express')
const bodyParser = require("body-parser")
const jwt = require('express-jwt')

const {Tracer, 
  ExplicitContext, 
  BatchRecorder,
  jsonEncoder: {JSON_V2}} = require('zipkin');
const {HttpLogger} = require('zipkin-transport-http');
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;

const routes = require('./routes')

const ZIPKIN_URL = process.env.ZIPKIN_ADDRESS || 'http://127.0.0.1:9411/api/v2/spans';
const port = process.env.TODO_API_PORT || 8082
const jwtSecret = process.env.JWT_SECRET || "myfancysecret"
const app = express()

// tracing
const ctxImpl = new ExplicitContext();
const recorder = new  BatchRecorder({
  logger: new HttpLogger({
    endpoint: ZIPKIN_URL,
    jsonEncoder: JSON_V2
  })
});
const localServiceName = 'todos-api';
const tracer = new Tracer({ctxImpl, recorder, localServiceName});


app.use(jwt({ secret: jwtSecret }))
app.use(zipkinMiddleware({tracer}));
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: 'invalid token' })
  }
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

routes(app)

app.listen(port, function () {
  console.log('todo list RESTful API server started on: ' + port)
})
