export {};
const connectToCovid19DB = require('../database/connection');
const axios = require('axios');
const schedule = require('node-schedule');
const { COVID_19_API } = require('../../config.json');

async function updateData(url) {
    try {
        const data = await axios({
            method: 'get',
            url: `${url}/summary`,
            responseType: 'JSON',
        }).then(function (response) {
            // console.log(response?.data?.Global);
            return response?.data;
        });
        if (data) {
            const covid19collection = await connectToCovid19DB();
            if (
                typeof covid19collection.find().toArray() !== 'undefined' &&
                Object.keys(await covid19collection.find().toArray()).length !==
                    0
            ) {
                covid19collection.updateOne(
                    { dataType: 'globalData' },
                    {
                        $set: {
                            dataType: 'globalData',
                            globalData: data.Global,
                        },
                    }
                );
                covid19collection.updateOne(
                    { dataType: 'countriesData' },
                    {
                        $set: {
                            dataType: 'countriesData',
                            countriesData: data.Countries,
                        },
                    }
                );
                covid19collection.updateOne(
                    { dataType: 'date' },
                    { $set: { dataType: 'date', date: data.Date } }
                );
                console.log('data updated');
                return;
            } else {
                await covid19collection.insertMany([
                    { dataType: 'globalData', globalData: data.Global },
                    {
                        dataType: 'countriesData',
                        countriesData: data.Countries,
                    },
                    { dataType: 'date', date: data.Date },
                ]);
                console.log('data inserted');
                return;
            }
        } else return;
    } catch (error) {
        console.log(error);
    }
}

// everyday at 12:00 AM 
module.exports = schedule.scheduleJob('0 12 * * *', () => {
    updateData(COVID_19_API);
});
