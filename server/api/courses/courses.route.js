const router = require("express").Router();
const courses = require("./courses.controller");

router.get('/', courses.getAll);
router.get('/categories', courses.categories);
router.get('/:id', courses.get);
// router.get('/', users.getAll);
// router.post('/login', users.login);
// router.post('/register', users.create);

module.exports = router