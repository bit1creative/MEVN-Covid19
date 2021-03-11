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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
