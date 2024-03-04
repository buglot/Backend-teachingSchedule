const express = require('express');
const router = express.Router();
const db = require('../db');
const path = require('path');
const cron = require('node-cron');
const day = "1,2,3,4,5,6,7";
const cronExpression = '30 51 21 * * ' + day;
function autocheck() {
    console.log(12);
}

const s = cron.schedule(cronExpression, () => {
    console.log("dasd");
    autocheck();
});

module.exports = s;