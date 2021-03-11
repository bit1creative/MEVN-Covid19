export {};
const express = require('express');
const ipRouter = express.Router();
const https = require('https');

ipRouter.get('/ip', async (req, res) => {
    const ip = await req.connection.remoteAddress;
    https
        .get(
            // `https://ipgeolocation.abstractapi.com/v1/?api_key=04a87224d27c4aabb75ab7f2a9a12089&ip_address=${ip}`,
            'https://ipgeolocation.abstractapi.com/v1/?api_key=04a87224d27c4aabb75ab7f2a9a12089&ip_address=178.92.229.216',
            (resp) => {
                let data = '';

                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    try {
                        if (data != '') res.send(JSON.parse(data));
                        else res.send(null);
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
        )
        .on('error', (err) => {
            console.log('Error: ' + err.message);
        });
});

module.exports = ipRouter;
