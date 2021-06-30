const assignmentService = require("./assignment.service");
const { sign } = require("jsonwebtoken");

module.exports = {
    get : (req, res) => {
        console.log(req.params)
        let data = {
            req : req.params,
            user : req.user.result
        }
        assignmentService.get(data, (err, results) => {
            if(err | !results){
                res.json({
                    success : 0,
                    message : 'Please login'
                });
            }else{
                res.json(results[0]);
            }
        })
    },

}