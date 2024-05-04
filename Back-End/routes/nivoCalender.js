const calenderRoute = require('express').Router();
const createCalendarData = require('../utils/createCalender');

calenderRoute.get('/gcd', async (req, res) => {
    const calendarData = await createCalendarData();
    res.json(calendarData);
});

module.exports = calenderRoute;