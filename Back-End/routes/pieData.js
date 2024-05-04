const pieRoute = require('express').Router();
const { compare } = require('../utils/eRQAvSAFE');

pieRoute.get('/gpd', async (req, res) => {
    try {
        const data = await compare();
        res.json(data);
    } catch (error) {
        console.error(error);
    }
});
module.exports = pieRoute;