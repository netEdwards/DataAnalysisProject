const {spawn} = require('child_process');
const collectionRoute = require('express').Router();
const main = require('../utils/stager');

collectionRoute.get('/collect', async (req, res) => {
    const python = spawn('python', ['../Back-End/scripts/collect.py']);
    python.on('close', (code) => {
        console.log(`Python script finished with code ${code}`);
        res.sendStatus(200);
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