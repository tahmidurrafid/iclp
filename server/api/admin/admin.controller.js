const adminService = require("./admin.service");
module.exports = {
    categories: (req, res) => {
        adminService.categories(req, (err, results) => {
            if (err) {
                res.send("Error ase");
            } else {
                
                res.json(results);
            }
        })
    },
    deleteCategory:(req, res)=>{
        adminService.deleteCategory(req.params, (err, results) => {
            if (err) {
                res.send("Error ase");
            } else {
                res.json(results);
            }

        })
    },
}