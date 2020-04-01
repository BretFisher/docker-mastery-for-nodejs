FROM node:10-slim as prod
ENV NODE_ENV=production
EXPOSE 3000
WORKDIR /app
RUN chown -R node:node .
USER node
COPY --chown=node:node package.json package-lock.json* ./
RUN npm install --only=production && npm cache clean --force
COPY --chown=node:node . .
RUN rm -rf ./test
CMD ["node", "./bin/www"]

FROM prod as dev
ENV NODE_ENV=development
RUN npm install --only=development && npm cache clean --force
CMD ["npm", "run", "dev"]

FROM dev as test
ENV NODE_ENV=development
COPY --chown=node:node test /app/test
CMD ["npm", "run", "test"]
