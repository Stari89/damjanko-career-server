const mongoose = require('mongoose');

const Log = require('../models/log');

exports.logs_get_all = (req, res, next) => {
	Log.find()
		.select('created ip user endpoint message _id')
		.sort('-created')
		.limit(10000)
		.populate('user', 'name _id')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				logs: docs.map(doc => {
					return {
						created: doc.created,
						ip: doc.ip,
						user: doc.user,
						endpoint: doc.endpoint,
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

exports.logs_get_by_user = (req, res, next) => {
	const id = req.params.userId;
	Log.find({ user: id })
		.select('created ip user endpoint message _id')
		.sort('-created')
		.limit(10000)
		.populate('user', 'name _id')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				logs: docs.map(doc => {
					return {
						created: doc.created,
						ip: doc.ip,
						user: doc.user,
						endpoint: doc.endpoint,
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
};

exports.logs_delete_all = (req, res, next) => {
	Log.remove()
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Logs deleted'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}