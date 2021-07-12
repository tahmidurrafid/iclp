const router = require("express").Router();
const quiz = require("./quiz.controller");
router.post('/setquiz',quiz.setquiz);
router.get('/quizdata/:id',quiz.quizdata);
router.get('/topicname/:courseID/:topicID',quiz.topicname);
module.exports = router