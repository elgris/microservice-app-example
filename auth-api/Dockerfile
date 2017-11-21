FROM ubuntu:latest
EXPOSE 8081

RUN apt-get update -y && apt-get install curl -y && apt-get install golang -y && apt-get install git -y

ENV GOPATH /usr

COPY . /auth-api

CMD ["/auth-api/run.sh"]

