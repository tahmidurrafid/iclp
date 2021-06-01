const coursesService = require("./courses.service");

module.exports = {
    getAll : (req, res) => {
        coursesService.getAll(req.query, (err, results) => {
            if(err){
                res.send("Error ase");
            }else{
                res.json(results);
            }
        })
    },
    
    get : (req, res) => {
        // console.log(req.params)
        coursesService.get(req.params, (err, results) => {
            if(err){
                res.send("Error ase");
            }else{
                res.json(results);
            }
        })        
    },
        
    categories : (req, res) => {
        coursesService.categories(req, (err, results) => {
            if(err){
                res.send("Error ase");
            }else{
                res.json(results);
            }
        })
    },

}