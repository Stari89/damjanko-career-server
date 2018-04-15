const http = require('http');
const app = require('./app');

run();

/* Initialize everything */
function run() {
	validateEnvironmentVariables();
	startServer();
}

/* Checks environment variables before we start doing anything */
function validateEnvironmentVariables() {
	if (!process.env.DAMJANKO_CAREER_SERVER_PORT) {
		throw new Error('DAMJANKO_CAREER_SERVER_PORT environment variable is undefined');
	}
	if (!process.env.DAMJANKO_CAREER_SERVER_JWT_KEY) {
		throw new Error('DAMJANKO_CAREER_SERVER_JWT_KEY environment variable is undefined');
	}
	if (!process.env.DAMJANKO_CAREER_SERVER_MONGODB_URI) {
		throw new Error('DAMJANKO_CAREER_SERVER_MONGODB_URI environment variable is undefined');
	}
	if (!process.env.DAMJANKO_CAREER_SERVER_MONGODB_USER) {
		throw new Error('DAMJANKO_CAREER_SERVER_MONGODB_USER environment variable is undefined');
	}
	if (!process.env.DAMJANKO_CAREER_SERVER_MONGODB_PASSWORD) {
		throw new Error('DAMJANKO_CAREER_SERVER_MONGODB_PASSWORD environment variable is undefined');
	}
}

/* Starts server */
function startServer() {
	const port = process.env.DAMJANKO_CAREER_SERVER_PORT;
	const server = http.createServer(app);
	server.listen(port, () => console.log(`RESTful service damjanko-career-server listening on port ${port}`));
}