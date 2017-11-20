FROM node:8-alpine

EXPOSE 8082

WORKDIR /usr/src/app

COPY package-lock.json package.json *.js /usr/src/app/
COPY routes.js /usr/src/app/routes

RUN npm install && npm build

CMD ["sh", "-c", "npm start" ]
