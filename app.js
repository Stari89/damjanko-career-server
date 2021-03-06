// dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

/* MongoDB connection */
const mongodbUri = process.env.DAMJANKO_CAREER_SERVER_MONGODB_URI;

mongoose.connect(mongodbUri)
	.then(() => {
		console.log('Connected to mongodb');
	})
	.catch(err => {
		console.log('Could not connect to mongodb');
		throw err;
	});
mongoose.Promise = global.Promise;

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET,');
		return res.status(200).json({});
	}
	next();
});

// routes
const authenticationRoutes = require('./api/routes/authentication');
const userRoutes = require('./api/routes/users');
const logRoutes = require('./api/routes/logs');
const articleRoutes = require('./api/routes/articles');
const applicationRoutes = require('./api/routes/applications');
const clientLogRoutes = require('./api/routes/client-logs');

// Routes which should handle requests
app.use('/authentication', authenticationRoutes);
app.use('/users', userRoutes);
app.use('/logs', logRoutes);
app.use('/articles', articleRoutes);
app.use('/applications', applicationRoutes);
app.use('/client-logs', clientLogRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

// Handle errors
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;