const mongoose = require('mongoose');

const clientLogSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	created: { type: Date, required: true },
	ip: { type: String, required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	page: { type: String, required: true },
	message: { type: String, required: true }
});

module.exports = mongoose.model('ClientLog', clientLogSchema);