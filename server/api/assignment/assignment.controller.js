const assignmentService = require("./assignment.service");
const { sign } = require("jsonwebtoken");
const formidable = require('formidable');
const fs = require('fs');


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
                res.json(results);
            }
        })
    },
    submit : (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            let response = {
                success : {
                    success : 1,
                },
                failure : {
                    success : 0
                }
            }
            assignmnet = Object.keys(files);
            let parsed = JSON.parse(fields.data);

            let data = {
                course_id : req.params.course_id,
                assignment_id : req.params.assignment_id,
                user : req.user.result,
                file_name : files["file"].name
            }
            console.log(data , "===================");

            assignmentService.submit( data, (err, result) => {
                if(err){
                    res.json(response.failure);
                    return;
                }
                let oldPath = files["file"].path;
                var rawData = fs.readFileSync(oldPath);
                fs.writeFile(result.path, rawData, function(err){
                    if(err) console.log(err)
                })
                res.json(response.success);
            })
        });
    },
    getByInstructor : (req, res) => {
        let data = {
            user : req.user.result
        }
        console.log("Ashche")
        assignmentService.getByInstructor(data, (err, result)=> {
            if(err){
                res.json({
                    success : 0
                })
                return;
            }
            res.json(result);
        });
    },
    updateMark : (req, res) => {
        let data = {
            submission_id : req.params.submission_id,
            mark : req.body.mark
        }
        assignmentService.updateMark(data, (err, result) => {
            if(err){
                console.log(err);
                res.json({
                    success : 0 
                })
                return;
            }
            res.json({
                success : 1
            })
        })
    }
}