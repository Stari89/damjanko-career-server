const http = require("http");
const app = require("./app");

run();

/* Initialize everything */
function run() {
	validateEnvironmentVariables();
	startServer();
}

/* Checks environment variables before we start doing anything */
function validateEnvironmentVariables() {
	if (!process.env.DAMJANKO_CAREER_SERVER_JWT_KEY) {
		throw new Error(
			"DAMJANKO_CAREER_SERVER_JWT_KEY environment variable is undefined"
		);
	}
	if (!process.env.DAMJANKO_CAREER_SERVER_MONGODB_URI) {
		throw new Error(
			"DAMJANKO_CAREER_SERVER_MONGODB_URI environment variable is undefined"
		);
	}
}

/* Starts server */
function startServer() {
	var port = process.env.PORT || 3000;
	const server = http.createServer(app);
	server.listen(port, () =>
		console.log(
			`RESTful service damjanko-career-server listening on port ${port}`
		)
	);
}
