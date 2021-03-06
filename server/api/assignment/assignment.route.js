const router = require("express").Router();
const assignment = require("./assignment.controller");
const {checkToken} = require("../../auth/token")


router.get('/:course_id/:assignment_id', checkToken, assignment.get)
router.post('/:course_id/:assignment_id', checkToken, assignment.submit); 
router.get('/all', checkToken, assignment.getByInstructor);
router.put('/mark/:submission_id', checkToken, assignment.updateMark);
// router.get('/me', checkToken, users.get);
// router.get('/', users.getAll);
// router.post('/login', users.login);
// router.post('/register', users.create);

module.exports = router