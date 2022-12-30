FROM node:18-slim

# NOTE: these apt dependencies are only needed
# for testing. they shouldn't be in production
RUN apt-get update -qq \
    && apt-get install -qy --no-install-recommends \
    bzip2 \
    ca-certificates \
    curl \
    libfontconfig \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 80

WORKDIR /app

COPY package*.json ./

RUN npm install \
    && npm cache clean --force

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

CMD ["node", "server.js"]