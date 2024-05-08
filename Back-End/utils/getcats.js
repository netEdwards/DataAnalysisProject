const { Query } = require('../services/dbtoapp');

q = new Query();

const reports = async () => {return await q.getAllReports();}


const getAssessments = (reports) => {
    let assessments = [];
    reports.forEach(report => {
        if (!assessments.includes(report.assessment)) {
            assessments.push(report.assessment);
        }
    });
    return assessments;
}

const countAssessments = (assessments, reports) => {
    const assessmentsArray = [];
    assessments.forEach(cat => {
        let assCounting = 0
        reports.forEach(report => {
            if (report.assessment === cat) {
                assCounting+= 1
            }
            
        });
        const obj = {
            assessment: cat,
            value: assCounting
        }
        assessmentsArray.push(obj)
    });
    return assessmentsArray;
}

async function countedAssessments(){
    const reportsData = await reports();
    const assessments = getAssessments(reportsData);
    const countedAssessments = countAssessments(assessments, reportsData);
    return countedAssessments;
};
module.exports = countedAssessments;