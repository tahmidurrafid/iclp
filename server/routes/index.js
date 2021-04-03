const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/users', async (req, res, next) => {
    let ans;
    let done = false;
    await db.query("SELECT * FROM mytab", (error, result) => {
        res.send(result);
    });
});

module.exports = router