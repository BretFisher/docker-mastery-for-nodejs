'use strict';

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        request.logger.info('In handler %s', request.path);
        return 'Hello, world!';
    }
});

// do app logic here to determine if app is truly healthy
// you should return 200 if healthy, and anything else will fail
// if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
server.route({
    method: 'GET',
    path: '/healthz',
    handler: (request, h) => {

        request.logger.info('In handler %s', request.path);
        return 'I am happy and healthy\n';
    }
});

const init = async () => {

     await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response', 'onPostStart']
        }
    });


    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
