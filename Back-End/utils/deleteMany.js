const mg = require('mongoose');
const path = require('path');
const Report = require('../models/cfareports')

require('dotenv').config({path: path.join(__dirname, '..', '.env')});


/*



WARNING THIS WILL DELETE ALL OF THE REPORTS IN THE COLLECTIONS!!!!!!!!!!!!!!!!!!!!!
WARNING THIS WILL DELETE ALL OF THE REPORTS IN THE COLLECTIONS!!!!!!!!!!!!!!!!!!!!!
WARNING THIS WILL DELETE ALL OF THE REPORTS IN THE COLLECTIONS!!!!!!!!!!!!!!!!!!!!!
WARNING THIS WILL DELETE ALL OF THE REPORTS IN THE COLLECTIONS!!!!!!!!!!!!!!!!!!!!!
WARNING THIS WILL DELETE ALL OF THE REPORTS IN THE COLLECTIONS!!!!!!!!!!!!!!!!!!!!!
WARNING THIS WILL DELETE ALL OF THE REPORTS IN THE COLLECTIONS!!!!!!!!!!!!!!!!!!!!!
WARNING THIS WILL DELETE ALL OF THE REPORTS IN THE COLLECTIONS!!!!!!!!!!!!!!!!!!!!!



*/
mg.connect(process.env.MONGO_URI);
console.log('Connected to the database');

Report.collection.deleteMany({});
console.log('Deleted all documents from the collection');
console.log(Report.find({}).exec(),'All documents in the collection after deletion');
