const mongoose = require('mongoose');

const Application = require('../models/application');

exports.applications_get_user_assigned_application = (req, res, next) => {
	if (!req.userData || !req.userData.userId) {
		res.status(500).json({
			error: 'User not signed in'
		});
		next();
	}
	Application.findOne({ user_id: req.userData.userId, active: true })
		.select('name user_id active created modified applicationLetterMainEn_id applicationLetterMainSi_id applicationLetterSideEn_id applicationLetterSideSi_id curriculumVitaeMainEn_id curriculumVitaeMainSi_id curriculumVitaeSideEn_id curriculumVitaeSideSi_id aboutMainEn_id aboutMainSi_id aboutSideEn_id aboutSideSi_id _id')
		.populate('user_id', 'name _id')
		.populate('applicationLetterMainEn_id', 'name language content created modified _id')
		.populate('applicationLetterMainSi_id', 'name language content created modified _id')
		.populate('applicationLetterSideEn_id', 'name language content created modified _id')
		.populate('applicationLetterSideSi_id', 'name language content created modified _id')
		.populate('curriculumVitaeMainEn_id', 'name language content created modified _id')
		.populate('curriculumVitaeMainSi_id', 'name language content created modified _id')
		.populate('curriculumVitaeSideEn_id', 'name language content created modified _id')
		.populate('curriculumVitaeSideSi_id', 'name language content created modified _id')
		.populate('aboutMainEn_id', 'name language content created modified _id')
		.populate('aboutMainSi_id', 'name language content created modified _id')
		.populate('aboutSideEn_id', 'name language content created modified _id')
		.populate('aboutSideSi_id', 'name language content created modified _id')
		.exec()
		.then(doc => {
			console.log("From database", doc);
			if (doc) {
				const response = {
					application: {
							name: doc.name,
							user: doc.user_id,
							active: doc.active,
							created: doc.created,
							modified: doc.modified,
							applicationLetterMainEn: doc.applicationLetterMainEn_id,
							applicationLetterMainSi: doc.applicationLetterMainSi_id,
							applicationLetterSideEn: doc.applicationLetterSideEn_id,
							applicationLetterSideSi: doc.applicationLetterSideSi_id,
							curriculumVitaeMainEn: doc.curriculumVitaeMainEn_id,
							curriculumVitaeMainSi: doc.curriculumVitaeMainSi_id,
							curriculumVitaeSideEn: doc.curriculumVitaeSideEn_id,
							curriculumVitaeSideSi: doc.curriculumVitaeSideSi_id,
							aboutMainEn: doc.aboutMainEn_id,
							aboutMainSi: doc.aboutMainSi_id,
							aboutSideEn: doc.aboutSideEn_id,
							aboutSideSi: doc.aboutSideSi_id,
							_id: doc._id
						}
				};
				res.status(200).json(response);
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

exports.applications_get_all = (req, res, next) => {
	Application.find()
		 .select('name user_id active created modified applicationLetterMainEn applicationLetterMainSi applicationLetterSideEn applicationLetterSideSi curriculumVitaeMainEn curriculumVitaeMainSi curriculumVitaeSideEn curriculumVitaeSideSi aboutMainEn aboutMainSi aboutSideEn aboutSideSi _id')
		.sort('-created')
		.populate('user_id', 'name _id')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				applications: docs.map(doc => {
					return {
						name: doc.name,
						user: doc.user_id,
						active: doc.active,
						created: doc.created,
						modified: doc.modified,
						applicationLetterMainEn: { _id: doc.applicationLetterMainEn_id },
						applicationLetterMainSi: { _id: doc.applicationLetterMainSi_id },
						applicationLetterSideEn: { _id: doc.applicationLetterSideEn_id },
						applicationLetterSideSi: { _id: doc.applicationLetterSideSi_id },
						curriculumVitaeMainEn: { _id: doc.curriculumVitaeMainEn_id },
						curriculumVitaeMainSi: { _id: doc.curriculumVitaeMainSi_id },
						curriculumVitaeSideEn: { _id: doc.curriculumVitaeSideEn_id },
						curriculumVitaeSideSi: { _id: doc.curriculumVitaeSideSi_id },
						aboutMainEn: { _id: doc.aboutMainEn_id },
						aboutMainSi: { _id: doc.aboutMainSi_id },
						aboutSideEn: { _id: doc.aboutSideEn_id },
						aboutSideSi: { _id: doc.aboutSideSi_id },
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

exports.applications_create_application = (req, res, next) => {
	const application = new Application({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		user_id: req.body.user ? req.body.user._id : null,
		active: true,
		created: Date.now(),
		modified: Date.now(),
		applicationLetterMainEn_id: req.body.applicationLetterMainEn ? req.body.applicationLetterMainEn._id : null,
		applicationLetterMainSi_id: req.body.applicationLetterMainSi ? req.body.applicationLetterMainSi._id : null,
		applicationLetterSideEn_id: req.body.applicationLetterSideEn ? req.body.applicationLetterSideEn._id : null,
		applicationLetterSideSi_id: req.body.applicationLetterSideSi ? req.body.applicationLetterSideSi._id : null,
		curriculumVitaeMainEn_id: req.body.curriculumVitaeMainEn ? req.body.curriculumVitaeMainEn._id : null,
		curriculumVitaeMainSi_id: req.body.curriculumVitaeMainSi ? req.body.curriculumVitaeMainSi._id : null,
		curriculumVitaeSideEn_id: req.body.curriculumVitaeSideEn ? req.body.curriculumVitaeSideEn._id : null,
		curriculumVitaeSideSi_id: req.body.curriculumVitaeSideSi ? req.body.curriculumVitaeSideSi._id : null,
		aboutMainEn_id: req.body.aboutMainEn ? req.body.aboutMainEn._id : null,
		aboutMainSi_id: req.body.aboutMainSi ? req.body.aboutMainSi._id : null,
		aboutSideEn_id: req.body.aboutSideEn ? req.body.aboutSideEn._id : null,
		aboutSideSi_id: req.body.aboutSideSi ? req.body.aboutSideSi._id : null,
	});
	application.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Application created',
				application: {
					name: application.name,
						user_id: application.user_id,
						active: application.active,
						created: application.created,
						modified: application.modified,
						applicationLetterMainEn_id: application.applicationLetterMainEn_id,
						applicationLetterMainSi_id: application.applicationLetterMainSi_id,
						applicationLetterSideEn_id: application.applicationLetterSideEn_id,
						applicationLetterSideSi_id: application.applicationLetterSideSi_id,
						curriculumVitaeMainEn_id: application.curriculumVitaeMainEn_id,
						curriculumVitaeMainSi_id: application.curriculumVitaeMainSi_id,
						curriculumVitaeSideEn_id: application.curriculumVitaeSideEn_id,
						curriculumVitaeSideSi_id: application.curriculumVitaeSideSi_id,
						aboutMainEn_id: application.aboutMainEn_id,
						aboutMainSi_id: application.aboutMainSi_id,
						aboutSideEn_id: application.aboutSideEn_id,
						aboutSideSi_id: application.aboutSideSi_id,
						_id: application._id
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

exports.applications_get_application = (req, res, next) => {
	const id = req.params.applicationId;
	Application.findById(id)
		.select('name user_id active created modified applicationLetterMainEn applicationLetterMainSi applicationLetterSideEn applicationLetterSideSi curriculumVitaeMainEn curriculumVitaeMainSi curriculumVitaeSideEn curriculumVitaeSideSi aboutMainEn aboutMainSi aboutSideEn aboutSideSi _id')
		.populate('user_id', 'name _id')
		.populate('applicationLetterMainEn_id', 'name _id')
		.populate('applicationLetterMainSi_id', 'name _id')
		.populate('applicationLetterSideEn_id', 'name _id')
		.populate('applicationLetterSideSi_id', 'name _id')
		.populate('curriculumVitaeMainEn_id', 'name _id')
		.populate('curriculumVitaeMainSi_id', 'name _id')
		.populate('curriculumVitaeSideEn_id', 'name _id')
		.populate('curriculumVitaeSideSi_id', 'name _id')
		.populate('aboutMainEn_id', 'name _id')
		.populate('aboutMainSi_id', 'name _id')
		.populate('aboutSideEn_id', 'name _id')
		.populate('aboutSideSi_id', 'name _id')
		.exec()
		.then(doc => {
			console.log("From database", doc);
			if (doc) {
				const response = {
					application: {
							name: doc.name,
							user: doc.user_id,
							user_id: doc.user_id._id,
							active: doc.active,
							created: doc.created,
							modified: doc.modified,
							applicationLetterMainEn: doc.applicationLetterMainEn_id,
							applicationLetterMainSi: doc.applicationLetterMainSi_id,
							applicationLetterSideEn: doc.applicationLetterSideEn_id,
							applicationLetterSideSi: doc.applicationLetterSideSi_id,
							curriculumVitaeMainEn: doc.curriculumVitaeMainEn_id,
							curriculumVitaeMainSi: doc.curriculumVitaeMainSi_id,
							curriculumVitaeSideEn: doc.curriculumVitaeSideEn_id,
							curriculumVitaeSideSi: doc.curriculumVitaeSideSi_id,
							aboutMainEn: doc.aboutMainEn_id,
							aboutMainSi: doc.aboutMainSi_id,
							aboutSideEn: doc.aboutSideEn_id,
							aboutSideSi: doc.aboutSideSi_id,
							_id: doc._id
						}
				};
				res.status(200).json(response);
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

exports.applications_update_application = (req, res, next) => {
	const id = req.params.applicationId;
	const updateOps = {};
	for (const ops of req.body) {
		if (ops.propName === 'created' || ops.propName === 'modified') {
			continue;
		}
		updateOps[ops.propName] = ops.value;
	}
	updateOps['modified'] = Date.now();
	Application.update({ _id: id }, { $set: updateOps })
	.then(result => {
		console.log(result);
		res.status(200).json({
			message: 'Application updated'
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.applications_delete_application = (req, res, next) => {
	const id = req.params.applicationId;
	Application.remove({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Application deleted'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}