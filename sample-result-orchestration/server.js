/* jshint node: true */
/* jshint esversion: 6 */
var express = require('express'),
    async = require('async'),
    pg = require('pg'),
    { Pool } = require('pg'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    app = express(),
    stoppable = require('stoppable'),
    server = stoppable(require('http').Server(app)),
    io = require('socket.io')(server),
    redis = require('socket.io-redis');

io.set('transports', ['polling']);

var port = process.env.PORT || 80;

// simple checks to help readiness
var dbConnected = false;

// socket.io needs state storage if running more then one container
io.adapter(redis({ host: 'redis', port: 6379 }));

var pool = new pg.Pool({
  connectionString: 'postgres://postgres@db/postgres'
});

io.sockets.on('connection', function (socket) {
  console.info('a user connected');
  socket.emit('message', { text : 'Welcome!' });

  socket.on('subscribe', function (data) {
    console.info('a user subscribed');
    socket.join(data.channel);
  });

  socket.on('disconnect', function () {
    console.info('a user DISconnected');
  });
});

async.retry(
  {times: 1000, interval: 1000},
  function(callback) {
    pool.connect(function(err, client, done) {
      if (err) {
        console.error('Waiting for db');
      }
      callback(err, client);
    });
  },
  function(err, client) {
    if (err) {
      return console.error('Giving up');
    }
    console.log('Connected to db');
    dbConnected = true;
    getVotes(client);
  }
);

function getVotes(client) {
  client.query('SELECT vote, COUNT(id) AS count FROM votes GROUP BY vote', [], function(err, result) {
    if (err) {
      console.error('Error performing query: ' + err);
    } else {
      var votes = collectVotesFromResult(result);
      io.sockets.emit('scores', JSON.stringify(votes));
    }

    setTimeout(function() {getVotes(client); }, 1000);
  });
}

function collectVotesFromResult(result) {
  var votes = {a: 0, b: 0};

  result.rows.forEach(function (row) {
    votes[row.vote] = parseInt(row.count);
  });

  return votes;
}

app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/views/index.html'));
});

app.get('/healthcheck', function (req, res) {
  // Docker and Swarm-style Healthcheck
  // "is this ready for connections or should it be replaced?"
  // Once `start_period` has passed, if healthcheck
  // fails `retries` it will replace container
  // check your app internals for health but be careful
  // if you're checking for db connection as you could get into
  // race condition if db itself is failing healthcheck, as then
  // all containers trying to db connect would start failing as well
  // - If `docker run` fails this, nothing happens by design
  // - If `docker-compose` fail this, nothing happens by design
  // - If Docker Swarm services fail this, they replace the container
  if (dbConnected) {
      res.status(200).send('I am happy and healthy\n');
    } else {
      res.status(500).send('something is wrong, I am unhealthy\n');
    }
});

app.get('/readiness', function (req, res) {
  // "is this container ready for incoming connections?"
  // Kubernetes uses this to determine if container is ready for
  // incoming connections
  // 1. check that node/socket.io/express are ready
  // 2. check db is connected
  // - If Kubelet fails this test, it removes pod from LB
  if (dbConnected) {
    // do sample db query here
    res.status(200).send('I am happy and healthy\n');
  } else {
    res.status(500).send('something is wrong, I am unhealthy\n');
  }
});

app.get('/liveness', function (req, res) {
  // "does this container work or does it need to be replaced?"
  // check your app internals for health, but maybe
  // don't check for db connection, that's what readiness is for
  // this validates express is responding to requests
  // and not deadlocked
  // - If Kubelet fails this test, it kills and recreates pod
  res.status(200).send('I am happy and healthy\n');
});

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint () {
	console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm () {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  shutdown();
})

// shut down server
function shutdown() {
  console.info('starting stoppable');
  server.stop(); // this might take a while depending on connections
  console.info('starting pg pool end');
  dbConnected = false;
  pool.end();
  console.info('exiting');
  process.exit();
}

server.listen(port, function () {
  var port = server.address().port;
  console.log('App running on port ' + port);
});
