const usersService = require("./users.service");
const { sign } = require("jsonwebtoken");

module.exports = {
    get : (req, res) => {
        usersService.get(req.user.result, (err, results) => {
            if(err | !results){
                res.send("Error ase");
            }else{
                res.json(results[0]);
            }
        })
    },
    getAll : (req, res) => {
        console.log(req.user);
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
            if(err || !results || results[0].password != req.body.password){
                res.json({
                    success : 0,
                    message : 'Failed to login'
                })
            }else{
                const jsontoken = sign({ result: results[0] }, "iclptoken", {
                    expiresIn: "1h"
                });
                res.json({
                    success : 1,
                    message : 'login successful',
                    token : jsontoken
                })
            }
        })
    }
}