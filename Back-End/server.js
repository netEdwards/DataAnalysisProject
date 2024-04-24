const express = require('express');
const homeRouter = require('./routes/home.js')
const passport = require('passport');
const Session = require('express-session');
const authRoutes  = require('./routes/authRoutes');
const passportSetup = require('./services/uauth');
const registerRoute = require('./routes/createUser');
const flash = require('connect-flash');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => { 
      res.send('Hello World');
 });
 app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());




app.use('/', authRoutes);
app.use('/', registerRoute);
app.use('/home', homeRouter);

app.listen(PORT, () => {
   console.log(`Server is running on port http://localhost:${PORT}`);
});