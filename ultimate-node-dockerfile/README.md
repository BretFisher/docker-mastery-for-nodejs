# Ultimate Node.js Dockerfile Assignment

You are the Node.js developer for the "Dog vs. Cat voting app" project. You are given a basic Dockerfile and the source code for the "result" Node.js app.

Goal: take the Dockerfile in this directory and make it the ULTIMATE for a combination of local development, production, and testing of the "result" app using all the things you learned in this section.

## The finished Dockerfile should include

* Create a multi-stage Dockerfile that supports specific images for production, testing, and development.
* devDependencies should not exist in production image.
* Use `npm ci` to install production dependencies.
* Use Scenario 1 for setting up node_modules (the simple version).
* Set NODE_ENV properly for dev and prod.
* The dev stage should run (CMD) nodemon from devDependencies. Either by updating the `$PATH` or hard-coding the path to nodemon.
* Edit docker-compose.yml to target the dev stage.
* Add LABELS from OCI standard (values are up to you) to all images.
* Add `npm config list` output before running `npm install`.
* Create a test stage that runs `npm audit`.
* `./tests` directory should only exist in test image.
* Healthchecks should be added for production image.
* Prevent repeating costly commands like npm installs or apt-get if possible.
* Only `COPY . .` source code once, then `COPY --from` to get it into other stages.

## BONUS

* Add a security scanner to test stage and test it. Trivy (replaced microscanner) [trivy](https://github.com/aquasecurity/trivy)
* Add Best Practices from an earlier section, including:
  * Enable BuildKit and try a build.
  * Add tini to images so containers will receive shutdown signals.
  * Enable the non-root Node.js user for all dev/prod images.
  * You might need root user for test or scanning images depending on what you're doing (test and find out!)

## Things to test once finished to ensure it's working

* Build all stages as their own tag. `ultimatenode:test` should be bigger then `ultimatenode:prod`
* All builds should finish.
* Run dev/test/prod images, and ensure they start as expected.
* `docker-compose up` should work and you can vote at `http://localhost:5000` and see results at `http://localhost:5001`.
* Ensure prod image doesn't have unnecessary files by running
`docker run -it <imagename>:prod bash` and checking it:
  * ls contents of `/app/node_modules/.bin`, it should not contain `nodemon` or devDependencies.
  * ls contents of `/app` in prod image, it should not contain `./tests` directory.

Good Luck!
