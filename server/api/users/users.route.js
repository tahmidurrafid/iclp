const router = require("express").Router();
const users = require("./users.controller");
const {checkToken} = require("../../auth/token")

router.get('/me', checkToken, users.get);
router.post('/login', users.login);

module.exports = router