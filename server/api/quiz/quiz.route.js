const router = require("express").Router();
const quiz = require("./quiz.controller");
router.post('/setquiz',quiz.setquiz);;
module.exports = router