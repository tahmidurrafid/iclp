const router = require("express").Router();
const courses = require("./courses.controller");
const {checkToken} = require("../../auth/token");

//Get All Course
router.get('/', courses.getAll);
//Get all course Categories
router.get('/categories', courses.categories);
//Get Course Based on ID
router.get('/:id', courses.get);
//Get all Course Details Based on ID
router.get('/:id/all', checkToken, courses.getFullCourse);
router.get('/next/:course_id/:topic_id', checkToken, courses.getNext)

/************ INSTRUCTOR ************/
router.get('/for/instructor', checkToken, courses.getAllForInstructor);
//Create Course - instructor
router.post('/create', checkToken, courses.create);
//Save Topic by instructor
router.post('/topic', checkToken, courses.saveTopic);
//Uplaod video under a topic
router.post('/video', checkToken, courses.saveVideo);
//Uplaod video under a topic
router.put('/content', checkToken, courses.updateContent);
//Update course topic content
router.post('/assignment', checkToken, courses.saveAssignment);
//Delete course topic
router.delete('/:course_id/topic/:topic_id', checkToken, courses.deleteTopic);
//Delete course topic
router.delete('/:course_id/assignment/:topic_id', checkToken, courses.deleteAssignment);

/************ USER ************/
router.post('/enroll/:id', checkToken, courses.enroll)
router.get('/enrolled/:id', checkToken,  courses.enrolled )
router.get('/for/user', checkToken, courses.getAllForUser);
module.exports = router