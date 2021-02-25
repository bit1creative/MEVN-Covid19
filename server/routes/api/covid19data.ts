export {};
const express = require('express');
const mongodb = require('mongodb');
const connectToCovid19DB = require('../../database/connection');

const router = express.Router();

//Get total data about covid
router.get('/total', async (req, res) => {
    const covidData = await connectToCovid19DB();
    res.send(
        await covidData.find({ dataType: 'globalData' }, { _id: 0 }).toArray()
    );
    // console.log(
    //     await covidData
    //         .find({ dataType: 'globalData' }, { projection: { _id: 0 } })
    //         .toArray()
    // );
});

// Get date when info was updated
router.get('/date', async (req, res) => {
    const covidData = await connectToCovid19DB();
    res.send(
        await covidData.find({ dataType: 'date' }, { _id: 0 }).toArray()
    );
});

// Get info about each country
router.get('/countries', async (req, res) => {
    const covidData = await connectToCovid19DB();
    res.send(
        await covidData.find({ dataType: 'countriesData' }, { _id: 0 }).toArray()
    );
});

module.exports = router;
