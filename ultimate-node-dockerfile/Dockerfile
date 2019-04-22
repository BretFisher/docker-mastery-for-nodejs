FROM node:8-slim

# NOTE: these apt dependencies are only needed
# for testing. they shouldn't be in production
RUN apt-get update -qq && apt-get install -qy \ 
    ca-certificates \
    bzip2 \
    curl \
    libfontconfig \
    --no-install-recommends

EXPOSE 80

WORKDIR /app

COPY package*.json ./

RUN npm install \
    && npm cache clean --force

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

CMD ["node", "server.js"]