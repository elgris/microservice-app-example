# Example microservice app

This is an example of web application comprising of several components communicating to each other. In other words, this is an example of microservice app. Why is it better than many other examples? Well, because these microservices are written in different languages. This approach gives you flexibility for running experiments in polyglot environment.

The app itself is a simple TODO app that additionally authenticates users. I planned to add some admin functionality, but decided to cut the scope and add it later if needed.

## Components

1. [Frontend](/frontend) part is a Javascript application, provides UI. Created with [VueJS](http://vuejs.org)
2. [Auth API](/auth-api) is written in Go and provides authorization functionality. Generates JWT tokens to be used with other APIs.
3. [TODOs API](/todos-api) is written with NodeJS, provides CRUD functionality ove user's todo records.
4. [Users API](/users-api) is a Spring Boot project written in Java. Provides user profiles. Does not provide full CRUD for simplicity, just getting a single user and all users.

Take a look at the components diagram that describes them and their interactions.
![microservice-app-example](https://user-images.githubusercontent.com/1905821/32994354-554c4574-cd66-11e7-872b-55a37b6864c2.png)

## Use cases

- Evaluate various instruments (monitoring, tracing, you name it): how easy they integrate, do they have any bugs with different languages, etc.

## How to start

The easiest way is to use `docker-compose`:

```
docker-compose up --build
```

## Contribution

This is definitely a contrived project, so it can be extended in any way you want. If you have a crazy idea (like RESTful API in Haskell that counts kittens of particular user) - just submit a PR.

## License

MIT
