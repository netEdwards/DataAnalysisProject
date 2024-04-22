const express = require('express');
const homeRouter = require('./routes/home.js')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => { 
      res.send('Hello World');
 });
app.use('/home', homeRouter);

app.listen(PORT, () => {
   console.log(`Server is running on port http://localhost:${PORT}`);
});