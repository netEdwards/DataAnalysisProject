const assessmentRoute = require('express').Router();
const countedAssessments = require('../utils/getcats');

assessmentRoute.get('/aData', async (req, res) => {
    await countedAssessments()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error in retrieving the assessment Data | Assessment data Route (assessmentData.js)' });
        });
});
module.exports = assessmentRoute;