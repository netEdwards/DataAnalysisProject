const express = require('express');
const { Query } = require('../services/dbtoapp');

const homeRouter = express.Router();
q1 = new Query;

homeRouter.get('/', async (req, res) => {
    feedParse().then((feedData) => {res.send(feedData)}).catch((err) => {console.error(err)});
});


// Create data arrays for the feed. As of now lets do all 20 reports I have once I can get back to getting
// the data regularly we will use the weekly reports.

const feedParse = async () => {
    const reports = await q1.getAllReports();
    const feedDataArray = reports.map(report => {
        return {
            aType: report.aType,
            assessment: report.assessment,
            question: report.question.qText,
            finding: report.question.qFinding,
            observer: report.question.observer,
            date: new Date(report.question.oDate).toLocaleDateString('en-US')
        };
    });
    return feedDataArray;
}   

module.exports = homeRouter;