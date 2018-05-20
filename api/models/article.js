const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true, unique: true },
	language: { type: String, required: true },
	content: { type: String },
	created: { type: Date },
	modified: {type: Date }
});

module.exports = mongoose.model('Article', articleSchema);