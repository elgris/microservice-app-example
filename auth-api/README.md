# auth-api

This part of the exercise is responsible for authentication.
It provides a single useful API endpoint `POST /login` that takes a simple JSON object and 
returns an access token in case of successful authentication.

The JSON object structure is following:
```json
{
    "username": "admin",
    "password": "admin",
}
```

## Prerequisites
[Users API](/users-api) must be running, because `auth-api` fetches user data from it (yes, it is a little bit contrived, but anyways it's OVERENGINEERING!)

## Configuration

The binary scans environment for variables:
- `AUTH_API_PORT` - the port the service takes .
- `USERS_API_ADDRESS` - base URL of [Users API](/users-api).
- `JWT_SECRET` - secret value for JWT generator. Must be shared amongst all components.

## Building and running

1. Update the dependencies
```
glide up
```
2. Compile a binary and then run it
```
go build
AUTH_API_PORT=8000 USERS_API_ADDRESS=http://users-api:8082 JWT_SECRET=foo ./auth-api
```

{"username": "admin","password": "admin"}
## Usage

```
 curl -X POST  127.0.0.1:8000/login -d '{"username": "admin","password": "admin"}'
```