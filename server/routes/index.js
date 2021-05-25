const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/users', async (req, res, next) => {
    await db.query("SELECT * FROM MyGuests", (error, result) => {
        res.send(result);
    });
});

module.exports = router