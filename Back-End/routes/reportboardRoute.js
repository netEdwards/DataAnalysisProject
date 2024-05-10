const rBoardRouter = require('express').Router();
const { Query } = require('../services/dbtoapp');
const {google} = require('googleapis');
require('dotenv').config();


const auth = () => {
  try{
    const serviceAccount = JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8'));
    return new google.auth.JWT(
      serviceAccount.client_email, null, serviceAccount.private_key,
      ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
    );
  }catch(e){
    console.log("GOOGLE ERROR: \n GOOGLE ERROR:\n GOOGLE ERROR:",e);
  }
}

const sheets = google.sheets({ version: 'v4', auth: auth() });
const drive = google.drive({ version: 'v3', auth: auth() });


rBoardRouter.get('/grdHiram', async (req, res) => {
    const parsedReports = await parseReports();
    const reports = await getHiram(parsedReports);
    res.json(reports);
});

rBoardRouter.get('/grdDallas', async (req, res) => {
    const parsedReports = await parseReports();
    const reports = await getDallas(parsedReports);
    res.json(reports);
});


const parseReports = async () => {
    const q = new Query();
    const reports = await q.getPreviousWeeksReports();
    const transformedReports = reports.map(report => {
        return {
            store: report.store,
            aType: report.aType,
            assessment: report.assessment,
            obsever: report.question.observer,
            question: report.question.qText,
            finding: report.question.qFinding,
            priority: report.priority,
            date: report.question.oDate,
            time: report.question.oTime
        }
    })
    return transformedReports;
}

const getHiram = async (parsedReport) => {
    const hiramReports = parsedReport.filter(report => report.store === 'CFA - 04866 Hiram FSU');
    return hiramReports;
}

const getDallas = async (parsedReport) => {
    const dallasReports = parsedReport.filter(report => report.store === 'CFA - 02679 Dallas (GA) FSU');
    return dallasReports;
}
// Routes for creating and piping data to google sheets
rBoardRouter.get('/grdHiramSheet', async (req, res) => {
    const parsedReports = await parseReports();
    const reports = await getHiram(parsedReports);
  
    const sheetId = await createSheet('Hiram Reports');
    await addColumnTitles(sheetId);
    await addData(sheetId, reports);
  
    await downloadSheet(sheetId, 'csv', res);
    console.log(`Created new sheet with ID: ${sheetId}`);
  });

rBoardRouter.get('/grdDallasSheet', async (req, res) => {
  const parsedReports = await parseReports();
  const reports = await getDallas(parsedReports);

  const sheetId = await createSheet('Dallas Reports');
  await addColumnTitles(sheetId);
  await addData(sheetId, reports);

  await downloadSheet(sheetId, 'csv', res);
  console.log(`Created new sheet with ID: ${sheetId}`);
});



async function createSheet(title) {
  const response = await sheets.spreadsheets.create({
    resource: {
      properties: {
        title: title,
      },
    },
  });

  console.log(`Created new spreadsheet with ID: ${response.data.spreadsheetId}`);
  return response.data.spreadsheetId;
}

async function addColumnTitles(sheetId) {
    const titles = ['Store', 'Type', 'Assessment', 'Observer', 'Question', 'Finding', 'Priority', 'Date', 'Time'];
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: 'A1:I1',
      valueInputOption: 'RAW',
      resource: {
        values: [titles],
      },
    });
  
    console.log(`Added column titles to spreadsheet with ID: ${sheetId}`);
  }


async function addData(sheetId, data) {
  const rows = data.map(report => [
    report.store,
    report.aType,
    report.assessment,
    report.obsever,
    report.question,
    report.finding,
    report.priority,
    report.date,
    report.time,
  ]);

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'A2',
    valueInputOption: 'RAW',
    resource: {
      values: rows,
    },
  });

  console.log(`Added data to spreadsheet with ID: ${sheetId}`);
}



// DOWNLOAD SHEET
const fs = require('fs');


async function downloadSheet(sheetId, format = 'csv', res) {
    const response = await drive.files.export({
      fileId: sheetId,
      mimeType: `text/${format}`,
    }, { responseType: 'stream' });
  
    res.setHeader('Content-Disposition', `attachment; filename=${sheetId}.${format}`);
    response.data.pipe(res);
}

module.exports = rBoardRouter;