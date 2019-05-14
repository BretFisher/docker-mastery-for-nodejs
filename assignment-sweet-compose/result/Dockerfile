FROM node:8.16-alpine

WORKDIR /app

RUN npm install -g nodemon
COPY package*.json /app/
RUN npm install \
 && npm ls \
 && npm cache clean --force \
 && mv /app/node_modules /node_modules
COPY . /app

ENV PORT 80
EXPOSE 80

CMD ["node", "server.js"]
