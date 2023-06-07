# this is an answer file for Assignment Migrating Traditional Apps
# move it up a directory for it to work
FROM node:14

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    graphicsmagick \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV CHARCOAL_FACTOR=0.1

CMD ["node", "index.js"]
