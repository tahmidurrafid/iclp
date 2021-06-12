const router = require("express").Router();
const game = require("./game.controller");
router.post('/creategame', game.creategame);
module.exports = router