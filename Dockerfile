FROM node:8.8-alpine

COPY app /app/

WORKDIR /app

RUN npm install

CMD ["node", "/app/index.js"]
