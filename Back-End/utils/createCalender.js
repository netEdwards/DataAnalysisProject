const { Query } = require('../services/dbtoapp')

const createCalendarData = async () => {
    const q = new Query();
    const reports = await q.getAllReports();

    const reportsByDate = {};

    reports.forEach(report => {
        const date = new Date(report.question.oDate).toISOString().split('T')[0];
        if (!reportsByDate[date]) {
            reportsByDate[date] = {};
        }
        if (!reportsByDate[date][report.aType]) {
            reportsByDate[date][report.aType] = 1;
        }
    });

    const calendarData = Object.keys(reportsByDate).map(date => {
        const uniqueReportTypesCount = Object.keys(reportsByDate[date]).length;
        return {
            day: date,
            value: uniqueReportTypesCount
        };
    });

    return calendarData;
}

module.exports = createCalendarData;