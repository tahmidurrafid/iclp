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
    }
}