export {};
const express = require('express');
const ipRouter = express.Router();
const axios = require('axios');

ipRouter.get('/ip', async (req, res) => {
    const ip = (await req.ip) || req.connection.remoteAddress;

    axios
        .get(
            'https://ipgeolocation.abstractapi.com/v1/?api_key=04a87224d27c4aabb75ab7f2a9a12089&ip_address=2.21.100.0'
        )
        .then((response) => {
            // console.log(JSON.parse(res));
            res.send(response.data);
        })
        .catch(() => {
            res.sendStatus(404);
        });
});

module.exports = ipRouter;
