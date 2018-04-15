const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.users_get_all = (req, res, next) => {
	User.find()
		.select('name _id')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				users: docs.map(doc => {
					return {
						name: doc.name,
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

exports.users_create_user = (req, res, next) => {
	User.find({ name: req.body.name })
		.exec()
		.then(user => {
			if (user.length > 0) {
				return res.status(409).json({
					message: 'User already exists'
				});
			}
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if (err) {
					console.log(err);
					res.status(500).json({
						error: err
					});
				}
				const user = new User({
					_id: new mongoose.Types.ObjectId(),
					name: req.body.name,
					password: hash
				});
				console.log(user);
				user.save()
					.then(result => {
						console.log(result);
						res.status(201).json({
							message: 'User created',
							user: { _id: user._id, name: user.name }
						});
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({
							error: err
						});
					});
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}

exports.users_get_user = (req, res, next) => {
	const id = req.params.userId;
	User.findById(id)
		.select('name _id')
		.exec()
		.then(doc => {
			console.log("From database", doc);
			if (doc) {
				res.status(200).json({
					user: doc
				});
			} else {
				res.status(404).json({ message: 'No valid entry found for provided ID' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}

exports.users_delete_user = (req, res, next) => {
	const id = req.params.userId;
	User.remove({ _id: id})
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'User deleted'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}

exports.users_signin = (req, res, next) => {
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
							userId: users[i]._id
						},
						process.env.DAMJANKO_CAREER_SERVER_JWT_KEY,
						{
							expiresIn: '1h'
						});
					return res.status(200).json({
						message: 'Auth successful',
						token: token,
						user:
						{
							_id: users[i]._id,
							name: users[i].name
						}
					});
				}
			}
			return res.status(401).json({
				message: 'Auth failed'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(401).json({
				error: 'Auth failed'
			});
		});
}