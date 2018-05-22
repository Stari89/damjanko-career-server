const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    active: { type: Boolean, required: true },
    applicationLetterMainEn: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    applicationLetterMainSi: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    applicationLetterSideEn: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    applicationLetterSideSi: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    curriculumVitaeMainEn: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    curriculumVitaeMainSi: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    curriculumVitaeSideEn: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    curriculumVitaeSideSi: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    aboutMainEn: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    aboutMainSi: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    aboutSideEn: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    aboutSideSi: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
});