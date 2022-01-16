FROM node:10-alpine

RUN apk add --no-cache curl

WORKDIR /app

RUN npm install -g nodemon
COPY package*.json ./
RUN npm install \
 && npm cache clean --force \
 && mv /app/node_modules /node_modules
COPY . /app

HEALTHCHECK --interval=5s --timeout=3s --start-period=15s \
  CMD curl -f http://127.0.0.1/healthcheck || exit 1
ENV PORT 80
EXPOSE 80

CMD ["node", "server.js"]
