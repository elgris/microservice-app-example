# Example microservice app

This is an example of web application comprising of several components communicating to each other. In other words, this is an example of microservice app. Why is it better than many other examples? Well, because microservices are written in different languages. This approach gives you flexibility for running experiments in polyglot environment.

The app itself is a simple TODO app that additionally authenticates users and provides some admin functionality.

## Components

1. [Frontend](/frontend) part is a Javascript application, provides UI. Created with [VueJS](http://vuejs.org)
2. [Auth API](/auth-api) is written in Go and provides authorization functionality. Generates JWT tokens to be used with other APIs.
3. [TODOs API](/todos-api) is written with NodeJS, provides CRUD functionality ove user's todo records.
4. [Users API](/users-api) is a Spring Boot project written in Java. Provides user profiles. Does not provide full CRUD for simplicity, just getting a single user and all users.
5. [Event processor](event-processor) is a worker written in Python. Just reads messages from the queue and puts them into file (remember: `/dev/null` is also a file =] ).

## Use cases

- Evaluate various instruments (monitoring, tracing, you name it): how easy they integrate, do they have any bugs with different languages, etc.

## Contribution

This is definitely a contrived project, so it can be extended in any way you want. If you have a crazy idea (like RESTful API in Haskell that counts kittens of particular user) - just submit a PR.

## License

MIT

## Roadmap
- [ ] Make all components configurable with env vars (especially API hosts/ports):
    - [ ] frontend
    - [ ] auth-api
    - [ ] todos-api
- [ ] create Docker Compose so everything can spin up with a single command
- [ ] Write dockerfiles for all the components
- [ ] Write readmes for all the components