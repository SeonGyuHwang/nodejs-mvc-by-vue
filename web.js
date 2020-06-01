
/**
 * App Globals Setting
 */

global.users = {};
global.user_email = null;
global.user_redirect = '/';

global.DOMAIN = null;
global.EXCLUDE_URI = ['auth', 'cron'];

// App Encrypt Start
global.ENCRYPT_KEY = 'node_mvc_eeivue';
global.ENCRYPT_IV = '#@$%^&*()_+=-';

global.SESSION_SECRET = '$hofj#h*@fue!hs#g^37(7';
// App Encrypt End

// App Path Start
global.ROOT = __dirname;
global.VIEWS = ROOT+'/views';
global.PUBLIC = ROOT+'/public';
global.RESOURCE = ROOT+'/resource';

global.DAO = RESOURCE+'/dao';
global.ROUTES = RESOURCE+'/routes';
global.SERVICE = RESOURCE+'/service';
// App Path End

// App Modules Start
global.moment = require('moment');
global.url = require('url');
global.fs = require('fs');
global.express = require('express');
global.session = require('express-session');
global.router = express.Router();
global.app = module.exports = express();

const sessionOptions = {
    secret: SESSION_SECRET
    ,resave: false
    ,saveUninitialized: true
};

app.use(session(sessionOptions));
// App Modules End

// App Function Start
global.json5 = require('json5');
global.crypto = require('crypto');
global.ENC_KEY = crypto.createHash('sha256').update(ENCRYPT_KEY, 'utf8').digest('hex').slice(0, 32);
global.ENC_IV = crypto.createHash('sha256').update(ENCRYPT_IV, 'utf8').digest('hex').slice(0, 16);
global.Func = require(RESOURCE+'/common/func');
// App Function End

// App DB Start
global.mysql = require('mysql');
global.pool = mysql.createPool({
    host     : 'host',
    user     : 'user',
    password : 'password',
    database : process.env.NODE_ENV === 'DEV' ? 'spa_dev' : 'spa',
	connectionLimit : 100,
	waitForConnections : true,
	acquireTimeout: 10000
});
// App DB End

/**
 * Module dependencies.
 * web hook.....
 */

require(ROOT+'/bin/app');
const debug = require('debug')('board-mvc-vue-nodejs:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

global.PORT = normalizePort(process.env.PORT || '8080');
app.set('port', PORT);
app.set('trust proxy', true);
app.disable('view cache');

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const sharedSession = require("express-socket.io-session");
global.io = require('socket.io').listen(server);
io.use(sharedSession(session(sessionOptions),{
	autoSave: true
}));

require(RESOURCE+'/event')();

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debug('Listening on ' + bind);
}
