require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// scheduler to update covid-19 data every day
const updateDataScheduler = require('./scheduler/updateData');

const covid19ApiRouter = require('./routes/api/covid19data');
app.use('/api/covid-19', covid19ApiRouter);

const ipRouter = require('./routes/api/ip');
app.use('/api', ipRouter);

// Handle production
if (process.env.NODE_ENV === 'production') {
    //Static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
