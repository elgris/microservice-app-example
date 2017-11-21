FROM golang:1.9-alpine

EXPOSE 8081

WORKDIR /go/src/app
RUN apk --no-cache add curl git && \
    curl https://glide.sh/get | sh

COPY glide.* ./
RUN glide install

COPY . .
RUN go build -o auth-api

CMD /go/src/app/auth-api

