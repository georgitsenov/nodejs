FROM node:12

WORKDIR /usr/src/app

RUN git clone https://github.com/georgitsenov/nodejs ./

RUN npm install

EXPOSE 3000

CMD ["nodejs", "app.js"]