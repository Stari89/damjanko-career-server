const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, unique: true },
	password: { type: String, required: true },
	role: { type: String, required: true, default: 'user'},
	created: { type: Date },
	modified: { type: Date },
	fullName: { type: String },
	address: { type: String },
	userImagePath: { type: String }
});

module.exports = mongoose.model('User', userSchema);