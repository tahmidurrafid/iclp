const adminService = require("./admin.service");
module.exports = {
    categories: (req, res) => {
        adminService.categories(req, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }
        })
    },
    deleteCategory:(req, res)=>{
        adminService.deleteCategory(req.params, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }

        })
    },
    addCategory:(req, res)=>{
        adminService.addCategory(req.body.categoryName, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }

        })
    },
    updateCategory:(req, res)=>{
        adminService.updateCategory(req.body, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }

        })
    },
}