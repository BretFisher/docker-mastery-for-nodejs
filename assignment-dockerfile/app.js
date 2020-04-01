'use strict';

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0'
});

const shutdown = async () => {
    try {
        await server.stop({ timeout: 10000 });
        process.exitCode = 0;
        process.exit();
    } catch (e) {
        console.error(e);
        process.exitCode = 1;
        process.exit();
    }
};

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        request.logger.info('In handler %s', request.path);
        return 'Hello, world!';
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

// ctrl+c
process.on('SIGINT', () => {
    console.log('SIGINT fired');
    shutdown();
});

// docker container stop
process.on('SIGTERM', () => {
    console.log('SIGTERM fired');
    shutdown();
});

init();
