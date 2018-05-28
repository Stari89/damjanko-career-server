const mongoose = require('mongoose');

const Log = require('../models/log');


module.exports = (req, res, next) => {
	var ip = req.headers['x-forwarded-for'] || 
    	req.connection.remoteAddress || 
    	req.socket.remoteAddress ||
		(req.connection.socket ? req.connection.socket.remoteAddress : null);
	try {
		const logMessage = new Log({
			_id: new mongoose.Types.ObjectId(),
			created: Date.now(),
			ip: ip,
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