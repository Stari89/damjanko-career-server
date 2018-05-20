const mongoose = require('mongoose');

const Article = require('../models/article');

exports.articles_get_all = (req, res, next) => {
	Article.find()
		.select('name language content created modified _id')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				articles: docs.map(doc => {
					return {
						name: doc.name,
						language: doc.language,
						content: doc.content,
						created: doc.created,
						modified: doc.modified,
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

exports.articles_create_article = (req, res, next) => {
	const article = new Article({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		language: req.body.language,
		content: req.body.content,
		created: Date.now(),
		modified: Date.now()
	});
	article.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Article created',
				article: {
					_id: article._id,
					name: article.name,
					language: article.language,
					content: article.content,
					created: article.created,
					modified: article.modified
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}

exports.articles_get_article = (req, res, next) => {
	const id = req.params.articleId;
	Article.findById(id)
		.select('name language content created modified _id')
		.exec()
		.then(doc => {
			console.log("From database", doc);
			if (doc) {
				res.status(200).json({
					article: doc
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

exports.articles_update_article = (req, res, next) => {
	const id = req.params.articleId;
	const updateOps = {};
	for (const ops of req.body) {
		if (ops.propName === 'created' || ops.propName === 'modified') {
			continue;
		}
		updateOps[ops.propName] = ops.value;
	}
	updateOps['modified'] = Date.now();
	Article.update({ _id: id }, { $set: updateOps })
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json({
				message: 'Article updated'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}

exports.articles_delete_article = (req, res, next) => {
	const id = req.params.articleId;
	Article.remove({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Article deleted'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}