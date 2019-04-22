FROM node:10-alpine

EXPOSE 3000

RUN apk add --no-cache tini curl

# option 1, using curl to GET the default app url
# NOTE: ensure curl is installed in image
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

# option 2, using curl to GET a custom url with app logic
# NOTE: ensure curl is installed in image
HEALTHCHECK CMD curl -f http://localhost/healthz || exit 1

# option 3, a custom code healthcheck that could
# do a lot more things then a simple curl
# or simply avoid needing curl to begin with
HEALTHCHECK --interval=30s CMD node hc.js

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

ENTRYPOINT ["tini", "--"]

CMD ["node", "app.js"]
