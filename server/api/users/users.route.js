const router = require("express").Router();
const users = require("./users.controller");
const {checkToken} = require("../../auth/token")

router.get('/me', checkToken, users.get);
router.get('/', users.getAll);
router.post('/login', users.login);
router.post('/register', users.create);

module.exports = router