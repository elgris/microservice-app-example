FROM node:8-alpine

EXPOSE 8082

WORKDIR /usr/src/app

COPY package-lock.json package.json *.js /usr/src/app/
COPY routes /usr/src/app/routes

CMD [ "sh" ]