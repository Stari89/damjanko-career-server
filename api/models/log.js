const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	created: { type: Date, required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	endpoint: { type: String, required: true },
	message: { type: String, required: true }
});

module.exports = mongoose.model('Log', logSchema);