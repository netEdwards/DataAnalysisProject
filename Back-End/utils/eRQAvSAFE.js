// compares the amount of eRQA assessments vs the amount of SAFE assessments
const { Query } = require('../services/dbtoapp')

const compare = async () => {
    try {
        const q = new Query();
        const eRQA = await q.getReportByAssessmentType('eRQA');
        const SAFE = await q.getReportByAssessmentType('SAFE Daily Critical');
        const eCount = eRQA.length;
        const sCount = SAFE.length;
        return { eRQACount: eCount, safeCount: sCount };
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports = { compare };