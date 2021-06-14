const router = require("express").Router();
const game = require("./game.controller");
router.post('/creategame', game.creategame);
router.get('/allgames', game.allgames);
module.exports = router