const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// scheduler to update covid-19 data every day
const updateDataScheduler = require('./scheduler/updateData');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
const covid19data = require('./routes/api/covid19data');

app.use('/api/posts', posts);
app.use('/api/covid-19', covid19data);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
