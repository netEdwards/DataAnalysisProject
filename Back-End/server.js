const express = require('express');
const cors = require('cors');
const path = require('path');
const { passport} = require('./services/uauth'); // replace './services/uauth' with the path to your strategy file
const authRoutes  = require('./routes/authRoutes');
const registerRoute = require('./routes/createUser');
const homeRouter = require('./routes/home.js');
const collectionRoute = require('./routes/collection.js');
const calenderRoute = require('./routes/nivoCalender.js');
const pieRoute = require('./routes/pieData.js');
const rBoardRouter = require('./routes/reportboardRoute.js');
const demoRouter = require('./routes/demo.js');
const mg = require('mongoose');
const assessmentRoute = require('./routes/assessmentData.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mg.connect(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, '../frontend/build')));

// Site routes ======================================================================
app.use('/', authRoutes);
app.use('/', demoRouter);
app.use('/', passport.authenticate('jwt', { session: false }), registerRoute);
app.use('/home', passport.authenticate('jwt', { session: false }), homeRouter);
app.use('/', passport.authenticate('jwt', { session: false }), collectionRoute);
app.use('/', passport.authenticate('jwt', { session: false }), calenderRoute);
app.use('/', passport.authenticate('jwt', { session: false }), pieRoute);
try{app.use('/', passport.authenticate('jwt', { session: false }), rBoardRouter);}catch(e){console.log("GOOGLE ERROR: \n GOOGLE ERROR:\n GOOGLE ERROR:",e);}
app.use('/', passport.authenticate('jwt', { session: false }), assessmentRoute);

// =================================================================================



app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
   console.log(`Server is running on port http://localhost:${PORT}`);
});