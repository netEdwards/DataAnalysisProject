const mg = require('mongoose');
const fs = require('fs').promises;
const path = require('path'); 
const Report = require('../models/cfareports');


async function processJsonFilesFromDir(dirPath){
    try{
        const files =  await fs.readdir(dirPath);
        return files.filter(file => file.endsWith('.json'));
    }catch (err){
        console.error('Error reading the dir', err);
        return [];
    }
}

async function transformJsonData(jsonData){
    let transformedData = [];
    console.log('Transforming data');
    jsonData.DataPage.Items.forEach(item => {
        const document = {
            store: item[1],
            aType: item[2],
            combinedScoreGroup: item[4],
            priority: item[5],
            category: item[6],
            subCategory: item[7],
            assessment: item[8],
            question: {
                id: item[9],
                qText: item[10],
                qFinding: item[11],
                fixed: item[12],
                observer: item[13],
                oDate: item[14],
                oTime: item[15]
            }
        };
        console.log('Document : ', document);
        transformedData.push(document);
    });
    console.log('Completed Data Numbers : ', transformedData.length);
    return transformedData;
}

async function readAndProcessJsonFile(filePath){
    try{
        console.log('Reading the file', filePath);
        const rawData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(rawData);
        const transformedData = await transformJsonData(jsonData);
        const result = await Report.insertMany(transformedData);
        console.log('Insertion Result:', result);
    }catch(err){
        console.error('Error reading the file', err);
    } 
}

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
async function main(){
    const dirPath = path.join(__dirname, '..','data');
    console.log('Processing files from the directory', dirPath);
    const files = await processJsonFilesFromDir(dirPath);

    for (const file of files){
        const filePath = path.join(dirPath, file);
        await readAndProcessJsonFile(filePath);
        await fs.unlink(filePath)
    }

}



module.exports = main;