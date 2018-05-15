const mongoose = require('mongoose');

const Log = require('../models/log');


module.exports = (req, res, next) => {
	try {
		const logMessage = new Log({
			_id: new mongoose.Types.ObjectId(),
			created: Date.now(),
			user: req.userData ? req.userData.userId : null,
			endpoint: req.originalUrl,
			message: req.method
		});
		logMessage.save()
			.then(result => {
				next();
			})
			.catch(err => {
				console.log(err);
				next();
			});
	}
	catch (err) {
		console.log(err);
		next();
	}
}