const demoRouter = require('express').Router();
const reports = require('../data/GenStatic/reports.json');



demoRouter.get('/demo', (req, res) => {
    const selection = req.query.selection;
    const selectedData = selectReturn(selection);
    res.json(selectedData);
});


const selectReturn = (selection) => {
    if (selection === '1') {
        return getReportsFromRandomWeek();
    }else if (selection === '2') {
        return getReportsFromRandomMonth();
    }else{
        return getReportsFromYear(2023);
    }
};

demoRouter.get('/demoWeek', (req, res) => {
    const weeklyReports = getReportsFromRandomWeek();
    res.json(weeklyReports);
});
demoRouter.get('/demoMonth', (req, res) => {
    const monthlyReports = getReportsFromRandomMonth();
    res.json(monthlyReports);
});

demoRouter.get('/demoYear', (req, res) => {
    const yearlyReports = getReportsFromYear(2023);
    const report = req.query.index === '1' ? compare(yearlyReports) : createCalendarData(yearlyReports);
    res.json(report);
});

const compare = (reports) => {
    const eRQA = reports.filter(report => report.aType === 'eRQA');
    const SAFE = reports.filter(report => report.aType === 'SAFE');
    return { eRQACount: eRQA.length, safeCount: SAFE.length };
};
const createCalendarData = (reports) => {
    const reportsByDate = {};

    reports.forEach(report => {
        const date = new Date(report.date).toISOString().split('T')[0];
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
    console.log(calendarData);
    return calendarData;

};

const getReportsFromRandomWeek = () => {
    // Get a random week number between 1 and 52
    const weekNumber = Math.floor(Math.random() * 52) + 1;

    // Calculate the start and end dates of the week
    const startDate = new Date(2023, 0, 1 + (weekNumber - 1) * 7);
    const endDate = new Date(2023, 0, 1 + weekNumber * 7);

    // Filter the reports to get the ones from the random week
    return reports.filter(report => {
        const reportDate = new Date(report.date);
        return reportDate >= startDate && reportDate < endDate;
    });
};
const getReportsFromRandomMonth = () => {
    // Get a random month number between 0 (January) and 11 (December)
    const monthNumber = Math.floor(Math.random() * 12);

    // Calculate the start and end dates of the month
    const startDate = new Date(2023, monthNumber, 1);
    const endDate = new Date(2023, monthNumber + 1, 1);

    // Filter the reports to get the ones from the random month
    return reports.filter(report => {
        const reportDate = new Date(report.date);
        return reportDate >= startDate && reportDate < endDate;
    });
};

const getReportsFromYear = (year) => {
    // Calculate the start and end dates of the year
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    // Filter the reports to get the ones from the year
    return reports.filter(report => {
        const reportDate = new Date(report.date);
        return reportDate >= startDate && reportDate < endDate;
    });
};

module.exports = demoRouter;    