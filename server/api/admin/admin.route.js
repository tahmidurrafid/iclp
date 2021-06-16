const router = require("express").Router();
const admin = require("./admin.controller");
router.get('/categories', admin.categories);
router.delete('/categories/deleteCategory/:id',admin.deleteCategory);
router.post('/categories/addCategory',admin.addCategory);
router.put('/categories/updateCategory',admin.updateCategory);

module.exports = router