const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.authentication_isAuthenticated = (req, res, next) => {
	res.status(200).json({
		message: 'Authenticated'
	});
}

exports.authentication_authenticate = (req, res, next) => {
	const password = req.body.password;
	User.find()
		.select()
		.exec()
		.then(users => {
			for (let i in users) {
				if (bcrypt.compareSync(password, users[i].password)) {
					const token = jwt.sign(
						{
							name: users[i].name,
							role: users[i].role,
							userId: users[i]._id
						},
						process.env.DAMJANKO_CAREER_SERVER_JWT_KEY,
						{
							expiresIn: '1h'
						});
					return res.status(200).json({
						message: 'Authentication successful',
						token: token,
						user: users[i]
					});
				}
			}
			return res.status(401).json({
				message: 'Authentication failed'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(401).json({
				error: 'Authentication failed'
			});
		});
}