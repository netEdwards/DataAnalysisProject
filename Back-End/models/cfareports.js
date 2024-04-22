const mongoose = require('mongoose');

const cfaReportsSchema = new mongoose.Schema({
    store: String,
    aType: String,
    combinedScoreGroup: String,
    priority: String,
    category: String,
    subCategory: String,
    assessment: String,
    question: {
        id: String,
        qText: String,
        qFinding: String,
        fixed: String,
        observer: String,
        oDate: Date,
        oTime: String
    }
});

const Report = mongoose.model('Report', cfaReportsSchema, 'cfaReports');
module.exports = Report;