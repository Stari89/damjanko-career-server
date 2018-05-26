const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    active: { type: Boolean, required: true },
    created: { type: Date },
	modified: {type: Date },
    applicationLetterMainEn_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    applicationLetterMainSi_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    applicationLetterSideEn_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    applicationLetterSideSi_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    curriculumVitaeMainEn_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    curriculumVitaeMainSi_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    curriculumVitaeSideEn_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    curriculumVitaeSideSi_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    aboutMainEn_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    aboutMainSi_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    aboutSideEn_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    aboutSideSi_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
});

module.exports = mongoose.model('Application', applicationSchema);