const {spawn} = require('child_process');
const collectionRoute = require('express').Router();
const rateLimit = require('express-rate-limit');
const main = require('../utils/stager');

const limiter = rateLimit({
    windowMs: 5*60*1000, // 5 minute
    max: 1, // limit each IP to 5 requests per windowMs
    message: (req, res) => {
        return {
            status: 429, // Too Many Requests
            message: 'You have exceeded the 1 request in 5 minutes limit!'
        };
    }
});

collectionRoute.use('/collect', limiter);
collectionRoute.use('/update', limiter);

collectionRoute.get('/collect', (req, res) => {
    const python = spawn('python', ['../Back-End/scripts/main.py']);
    python.on('close', (code) => {
        console.log(`Python script finished with code ${code}`);
        res.sendStatus(201);
    });
});

collectionRoute.get('/update', async (req, res) => {
    try{
        await main();
        res.json({message: 'Database updated'});
    }catch(err)
    {console.error('Error reading the file', err);}
    
});

module.exports = collectionRoute;