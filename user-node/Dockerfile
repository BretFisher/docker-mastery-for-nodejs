FROM node:10-slim

EXPOSE 3000

# create a /node dir (owned by root) and cd into it
WORKDIR /node

# copy files to /node and make them owned by the node user
COPY --chown=node:node package*.json ./

# 1. create a /node/app dir (owned by root)
# 2. change permissions recursively on current working directory (/node) so group:user node:node becomes the new owner of the dir
RUN mkdir app && chown -R node:node .

# become node user
USER node

# since /node and all subdirs are owned by the node user, we can install npm modules without issue
RUN npm install && npm cache clean --force

# cd into /node/app (owned by node user)
WORKDIR /node/app

# copy src code into /node/app and make them owned by node user
COPY --chown=node:node . .

CMD ["node", "app.js"]
