# Strapi application

Just a sample app of how to run npm commands in docker compose, and how to initialize apps in compose.

Typical compose workflow when running everything inside a container, and bind-mounting the source code
and node_modules into the container:

```shell
# this runs npm install inside the container, and the bind-mount will write the files back to the host
docker-compose run api npm i
# this is how I would run one-off commands inside a container, before it was started with `up`
docker-compose run api npm run build
# now that strapi is initalized, we can use `up`
docker-compose up
```
