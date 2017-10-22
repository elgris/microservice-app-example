FROM node:8-alpine

WORKDIR /usr/src/app

RUN npm install && npm build

COPY package.json index.html .* /usr/src/app/
COPY build/ /usr/src/app/build
COPY config/ /usr/src/app/config
COPY src/ /usr/src/app/src
COPY static/ /usr/src/app/static

EXPOSE 8080

CMD ["sh", "-c", "npm i && npm start" ]