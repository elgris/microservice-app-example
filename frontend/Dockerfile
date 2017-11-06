FROM node:8-alpine

EXPOSE 8080

WORKDIR /usr/src/app

COPY package.json index.html .* /usr/src/app/
RUN npm install

COPY build/ /usr/src/app/build
COPY config/ /usr/src/app/config
COPY src/ /usr/src/app/src
COPY static/ /usr/src/app/static

CMD ["sh", "-c", "npm start" ]