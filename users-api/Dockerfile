FROM openjdk:8-alpine

EXPOSE 8083
WORKDIR /usr/src/app


COPY pom.xml mvnw ./
COPY .mvn/ ./.mvn
RUN ./mvnw dependency:resolve

COPY . .
RUN ./mvnw install

CMD ["java", "-jar", "./target/users-api-0.0.1-SNAPSHOT.jar"]
