const coursesService = require("./courses.service");

module.exports = {
    getAll: (req, res) => {
        coursesService.getAll(req.query, (err, results) => {
            if (err) {
                res.send("Error ase");
            } else {
                res.json(results);
            }
        })
    },

    create: (req, res) => {
        coursesService.create(req, (err, results)=> {
            if(!err){
                res.json({
                    success : 1
                })
            }else{
                res.json({
                    success : 0
                })
            }         
        });
    },

    get: (req, res) => {
        // console.log(req.params)
        coursesService.get(req.params, (err, results) => {
            if (err) {
                res.send("Error ase");
            } else {
                res.json(results);
            }
        })
    },

    categories: (req, res) => {
        coursesService.categories(req, (err, results) => {
            if (err) {
                res.send("Error ase");
            } else {
                res.json(results);
            }
        })
    },

}