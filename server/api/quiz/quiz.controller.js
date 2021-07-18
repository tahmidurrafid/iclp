const quizService = require("./quiz.service");
const formidable = require('formidable');
const { response } = require("express");
module.exports={
    setquiz: (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (err) {
                return res.send("error");
            }
            let data=fields;
            quizService.setQuiz(data, (err, results) => {
                if (err) {
                    return res.send("error");
                } else {
                    
                    return res.json(results);
                }
            });
        });
    },
    quizdata:(req, res)=>{
        quizService.quizData(req.params.id, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }

        })
    },
    topicname:(req, res)=>{
        quizService.topicName(req.params, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }

        })
    },
    topicname:(req, res)=>{
        quizService.topicName(req.params, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }

        })
    },
    userquiz:(req, res)=>{
        quizService.userQuiz(req.body, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }

        })
    },
    allcourses:(req, res)=>{
        quizService.allCourses((err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }

        })
    },
    setCategoryQuiz:(req, res)=>{
        const form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (err) {
                return res.send("error");
            }
            let data=fields;
            quizService.setCategoryQuiz(data, (err, results) => {
                if (err) {
                    return res.send("error");
                } else {
                    
                    return res.json(results);
                }
            });
        });
    },
    categoryquizdata:(req, res)=>{
        quizService.categoryquizData(req.params.id, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }

        })
    },
    skilltest:(req, res)=>{
        quizService.skillTest(req.body, (err, results) => {
            if (err) {
                res.send("error");
            } else {
                res.json(results);
            }

        })
    },


}