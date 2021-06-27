const coursesService = require("./courses.service");
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const { response } = require("express");


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

    saveAssignment : (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            let pdf;
            let response = {
                success : {
                    success : 1,
                },
                failure : {
                    success : 0
                }
            }
            pdf = Object.keys(files);
            let parsed = JSON.parse(fields.data);
            let location = "";
            if(pdf.length){
                parsed.name = files["pdf"].name;
                location = "storage/uploads/" + "assignment_" + parsed.course_id + "_" + parsed.topic_id + ".pdf";
            }
            console.log(pdf);
            parsed.location = location;
            coursesService.saveAssignment( parsed, (err, result) => {
                if(err){
                    res.json(response.failure);
                    return;
                }
                if(pdf.length){
                    let oldPath = files["pdf"].path;
                    console.log(oldPath);
                    var rawData = fs.readFileSync(oldPath);
                    fs.writeFile(parsed.location, rawData, function(err){
                        if(err) console.log(err)
                    })
                }
                res.json(response.success);                
            })
        });
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
        let data = {
            course_id : req.params.id
        }
        coursesService.get(data, (err, results) => {
            if (err) {
                res.send("Error ase");
            } else {
                res.json(results);
            }
        })
    },

    getFullCourse: async (req, res) => {
        let data = {
            user : req.user.result,
            course_id : req.params.id
        }
        let course = await coursesService.getFullCourse(data);
        res.json(course);
    },

    saveVideo : (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            let videos;
            let response = {
                success : {
                    success : 1,
                },
                failure : {
                    success : 0
                }
            }
            videos = Object.keys(files);
            let parsed = JSON.parse(fields.data);
            parsed.name = files["video"].name;
            coursesService.saveVideo( parsed, (err, result) => {
                if(err){
                    res.json(response.failure);
                    return;
                }
                let oldPath = files["video"].path;
                var rawData = fs.readFileSync(oldPath);
                fs.writeFile(result.path, rawData, function(err){
                    if(err) console.log(err)
                })
                res.json(response.success);
            })
        });
    },

    saveTopic : (req, res) => {

        const form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            let arr = Object.keys(files);
            let data = {};
            data.course = JSON.parse(fields.course);
            data.files = Object.keys(files);
            data.user = req.user.result;
            let response = {};

            coursesService.saveTopic(data, async (err, resSave) => {
                for(let i = 0; i < data.files.length; i++){
                    let format = data.files[i];
                    let oldPath = files[format].path;
                    let ext = format.split(".")[1];
                    let index = format.split(".")[0];

                    let media = await coursesService.saveMedia({
                        course_id : data.course.id,
                        topic_id : data.course.topic.id,
                        media_type : ext,
                    });

                    var newPath = media.link;

                    var rawData = fs.readFileSync(oldPath);
                    fs.writeFile(newPath, rawData, function(err){
                        if(err) console.log(err)
                    })
                    response["" + index] = media;
                }
                res.json(response)
            });
        });
    
    },

    updateContent : (req, res) => {
        coursesService.updateContent(req, (err, result) => {
            if(err){
                res.json({
                    success : 0
                })
            }else{
                res.json({
                    success : 1
                })                
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

    getAllForInstructor : (req, res) => {
        let data = {
            user_id : req.user.result.id,
        }
        coursesService.getAllForInstructor(data, (err, result) => {
            if(err){
                res.json({
                    success : 0
                })
            }else{
                res.json(result)
            }
        });
    },

    enroll : (req, res) => {
        let data = {
            course_id : req.params.id,
            user_id : req.user.result.id
        }
        coursesService.enroll(data, (err, result) => {
            if(err){
                res.json({
                    success : 0
                })
            }else{
                res.json({
                    success : 1
                })
            }
        })
    },

    enrolled : (req, res) => {
        let data = {
            course_id : req.params.id,
            user_id : req.user.result.id
        }
        coursesService.enrolled(data, (err, result) => {
            if(err){
                res.json({
                    success : 0
                })
                return;
            }
            console.log(result);
            res.json(result);
        })
    },

    deleteTopic : (req, res) => {
        let data = {
            req : req.params,
            user : req.user.result
        }
        coursesService.deleteTopic(data, (err, result) => {
            if(err){
                res.json({
                    success : 0,
                })
            }else{
                res.json({
                    success : 1,
                })
            }
        })
    },
    deleteAssignment : (req, res) => {
        let data = {
            req : req.params,
            user : req.user.result
        }
        coursesService.deleteAssignment(data, (err, result) => {
            if(err){
                res.json({
                    success : 0,
                })
            }else{
                res.json({
                    success : 1,
                })
            }
        })
    }

}