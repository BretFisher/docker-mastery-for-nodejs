# this is an answer file for Assignment
# move it up a directory for it to work

FROM node:10-slim as prod
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --only=production \
    && npm cache clean --force
COPY . .
CMD ["node", "./bin/www"]

FROM prod as dev
ENV NODE_ENV=development
RUN npm install --only=development
# FIXED this should not have a ../ in it. The app and node_modules are in the same dir
CMD ["node_modules/nodemon/bin/nodemon.js",  "./bin/www", "--inspect=0.0.0.0:9229"]

FROM dev as test
ENV NODE_ENV=development
CMD ["npm", "test"]
