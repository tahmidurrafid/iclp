const router = require("express").Router();
const courses = require("./courses.controller");
const {checkToken} = require("../../auth/token");

router.get('/', courses.getAll);
router.get('/categories', courses.categories);
router.get('/:id', courses.get);
router.get('/:id/all', courses.getFullCourse);
router.post('/create', checkToken, courses.create);
router.post('/topic', checkToken, courses.saveTopic);
router.post('/video', checkToken, courses.saveVideo);
router.put('/content', checkToken, courses.updateContent);

/************ INSTRUCTOR ************/
router.get('/for/instructor', checkToken, courses.getAllForInstructor);

module.exports = router