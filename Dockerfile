FROM node:8.8.1-alpine

RUN apk --update add libc6-compat

COPY app /app/

WORKDIR /app

RUN npm install

RUN npm rebuild

CMD ["node", "/app/index.js"]
