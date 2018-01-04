# todos-api

This service is written in NodeJS, it provides CRUD operations over TODO entries. 
It keeps all the data in memory. Following API endpoints are exposed:

- `GET /todos` - list all TODOs for a given user, user ID is taken from JWT
- `POST /todos` - create new TODO
- `DELETE /todos/:taskId` - modify a TODO by ID

TODO object looks like this:
```
{
    id: 1,
    userId: 1,
    content: "Create new todo"
}
```

## Configuration

The service scans environment for variables:
- `TODO_API_PORT` - the port the service takes.
- `JWT_SECRET` - secret value for JWT token processing.

## Building and running

```
npm install
JWT_SECRET=foo TODO_API_PORT=8082  npm start
```

## Usage

```
 curl -X POST -H "Authorization: Bearer $token" 127.0.0.1:8082/todos -d '{"content": "deal with that"}'
```
