export {};
const express = require('express');
const ipRouter = express.Router();
const axios = require('axios');
const requestIp = require('request-ip');

ipRouter.get('/ip', async (req, res) => {
    const clientIp = requestIp.getClientIp(req);
    axios
        .get(
            `https://ipgeolocation.abstractapi.com/v1/?api_key=04a87224d27c4aabb75ab7f2a9a12089&ip_address=${clientIp}`
        )
        .then((response) => {
            if (response.data.length == 0) {
                res.sendStatus(404);
            } else {
                res.send(response.data);
            }
        })
        .catch(() => {
            res.sendStatus(404);
        });
});

module.exports = ipRouter;
