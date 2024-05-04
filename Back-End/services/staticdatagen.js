const path = require('path');
const fs = require('fs');


const dataPath = path.join(__dirname, '../data/static');

const SAFE = JSON.parse(fs.readFileSync(path.join(dataPath, 'SAFEQuestions.json'), 'utf-8')); 
const eRQA = JSON.parse(fs.readFileSync(path.join(dataPath, 'eRQAQuestions.json'), 'utf-8')); 
const observer = JSON.parse(fs.readFileSync(path.join(dataPath, 'observers.json'), 'utf-8'));

const reports = [];

const getRandomItem = async (items) => {
    return items[Math.floor(Math.random() * items.length)];
};

const getRandomDate = () => {
    const start = new Date(2023, 0, 1); // start date: January 1, 2023
    const end = new Date(2024, 0, 1); // end date: January 1, 2024
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const createReports = async (numReports) => {
    const stores = ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5'];
    const reports = await Promise.all(Array.from({ length: numReports }, async () => {
      const isSafe = Math.random() < 0.5;
      const selectedItem = isSafe ? await getRandomItem(SAFE) : await getRandomItem(eRQA);
      const observerItem = await getRandomItem(observer);
  
      const report = {
        store: await getRandomItem(stores),
        aType: isSafe ? 'SAFE' : 'eRQA',
        assessment: "N/A",
        observer: observerItem.name,
        question: selectedItem.question,
        finding: await getRandomItem(selectedItem.findings),
        priority: isSafe ? selectedItem.priority : "", // always add priority, but let it be empty if the report is not SAFE
        date: getRandomDate().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };
  
      return report;
    }));
  
    return reports;
  };

await createReports(237).then((reports) => {
  fs.writeFileSync(path.join(__dirname, '../data/GenStatic/reports.json'), JSON.stringify(reports, null, 2));
  console.log('Reports generated and written to reports.json');
});