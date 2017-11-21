#!/bin/sh
cd tmp 
mvn install

java -jar /tmp/target/users-api-0.0.1-SNAPSHOT.jar
