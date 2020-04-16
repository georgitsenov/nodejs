FROM node:12

WORKDIR /usr/src/app

RUN npm install

EXPOSE 3000

CMD ["nodejs", "app.js"]