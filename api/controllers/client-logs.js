const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const ClientLog = require('../models/client-log');

exports.client_logs_get_all = (req, res, next) => {
	ClientLog.find()
		.select('created ip user page message _id')
		.sort('-created')
		.limit(10000)
		.populate('user', 'name _id')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				client_logs: docs.map(doc => {
					return {
						created: doc.created,
						ip: doc.ip,
						user: doc.user,
						page: doc.page,
						message: doc.message,
						_id: doc._id
					}
				})
			};
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}

exports.client_logs_get_by_ip = (req, res, next) => {
	const ip = req.params.ip;
	ClientLog.find({ ip: ip })
		.select('created ip user page message _id')
		.sort('-created')
		.limit(10000)
		.populate('user', 'name _id')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				client_logs: docs.map(doc => {
					return {
						created: doc.created,
						ip: doc.ip,
						user: doc.user,
						page: doc.page,
						message: doc.message,
						_id: doc._id
					}
				})
			};
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}

exports.client_logs_create_client_log = (req, res, next) => {
	var ip = req.headers['x-forwarded-for'] || 
    	req.connection.remoteAddress || 
    	req.socket.remoteAddress ||
		(req.connection.socket ? req.connection.socket.remoteAddress : null);
	var userId = null;
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.DAMJANKO_CAREER_SERVER_JWT_KEY);
		userId = decoded.userId;
	} catch (error) {
		userId = null;
	}
	const clientLog = new ClientLog({
		_id: new mongoose.Types.ObjectId(),
		created: Date.now(),
		ip: ip,
		user: userId,
		page: req.body.page,
		message: req.body.message
	});
	clientLog.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Client log created'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}

exports.client_logs_delete_all = (req, res, next) => {
	ClientLog.remove()
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Client logs deleted'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}