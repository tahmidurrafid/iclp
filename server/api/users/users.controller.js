const usersService = require("./users.service");
const { sign } = require("jsonwebtoken");

module.exports = {
    get : (req, res) => {
        usersService.get(req.user.result, (err, results) => {
            if(err | !results){
                res.json({
                    success : 0,
                    message : 'Please login'
                });
            }else{
                res.json({
                    success : 1,
                    data : results[0]
                });
            }
        })
    },
    getAll : (req, res) => {
        usersService.getAll(req, (err, results) => {
            if(err){
                res.send("Error ase");
            }else{
                res.json(results);
            }
        })
    },
    login : (req, res) => {
        usersService.getUserByEmail(req.body, (err, results) => {
            if(err || !results[0] || results[0].password != req.body.password){
                res.json({
                    success : 0,
                    message : 'Failed to login'
                })
            }else{
                const jsontoken = sign({ result: results[0] }, "iclptoken", {
                    expiresIn: "365d"
                });
                res.json({
                    success : 1,
                    message : 'login successful',
                    token : jsontoken
                })
            }
        })
    },
    create : (req, res) => {
        usersService.create(req.body, (err, results) => {
            if(err){
                res.json({
                    success : 0,
                    message : 'Failed to Register'
                })
            }else{
                res.json({
                    success : 1,
                    message : 'Registration Successful',
                })
            }
        })
    },

}