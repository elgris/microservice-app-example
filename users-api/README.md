# users-api
This service is written in Java with SpringBoot. It provides simple API to retrieve user data.

- `GET /users` - list all users
- `GET /users/:username` - get a user by name

## Configuration

The service scans environment for variables:
- `JWT_SECRET` - secret value for JWT token processing.
- `SERVER_PORT` - the port the service takes.

## Building and running

```
./mvnw clean install
JWT_SECRET=foo SERVER_PORT=8083 java -jar target/users-api-0.0.1-SNAPSHOT.jar
```