import { Router } from "express";
const axios = require('axios');

export const XTempTest = Router();

const path = '/temp-test';

XTempTest.route(path).get(async (req, res) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://192.168.1.109:8080/v1/train-station/gettemp',
            headers: {}
        };

        axios.request(config)
            .then((response: any) => {
               res.status(200).send(response.data);
            })
            .catch((error: any) => {
                res.status(404).send(error);
            });
            /*const mockup = {
                TempoNow: ((Math.random() * 5) + 25).toFixed(6),
                Humidity: ((Math.random() * 5) + 40).toFixed(6),
                createdat: (new Date()).toISOString()
            };*/
            //res.status(200).send([mockup]);
    } catch (error: any) {
        res.status(400).send();
    }
});


