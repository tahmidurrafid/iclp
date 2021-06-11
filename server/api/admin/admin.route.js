const router = require("express").Router();
const admin = require("./admin.controller");
router.get('/categories', admin.categories);
router.delete('/categories/deleteCategory/:id',admin.deleteCategory);
module.exports = router