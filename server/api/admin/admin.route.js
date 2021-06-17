const router = require("express").Router();
const admin = require("./admin.controller");
router.get('/categories', admin.categories);
router.delete('/categories/deleteCategory/:id',admin.deleteCategory);
router.post('/categories/addCategory',admin.addCategory);
router.put('/categories/updateCategory',admin.updateCategory);
router.get('/games', admin.games);
router.put('/games/updateGame',admin.updateGame);
router.delete('/games/deleteGame/:id',admin.deleteGame);

module.exports = router