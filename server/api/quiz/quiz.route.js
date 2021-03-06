const router = require("express").Router();
const quiz = require("./quiz.controller");
router.post('/setquiz',quiz.setquiz);
router.get('/quizdata/:id',quiz.quizdata);
router.get('/topicname/:courseID/:topicID',quiz.topicname);
router.put('/userquiz',quiz.userquiz);
router.get('/allcourses',quiz.allcourses);
router.put('/setCategoryQuiz',quiz.setCategoryQuiz);
router.get('/categoryquizdata/:id',quiz.categoryquizdata);
router.put('/skilltest',quiz.skilltest);
module.exports = router