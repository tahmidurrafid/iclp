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
    games: (req, res) => {
        adminService.games(req, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }
        })
    },
    updateGame:(req, res)=>{
        adminService.updateGame(req.body, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }

        })
    },
    deleteGame:(req, res)=>{
        adminService.deleteGame(req.params, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }

        })
    },
    courses: (req, res) => {
        adminService.courses(req, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }
        })
    },
    instructors: (req, res) => {
        adminService.instructors(req, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }
        })
    },
    updateInstructor: (req, res) => {
        adminService.updateInstructor(req.body, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }
        })
    },
}