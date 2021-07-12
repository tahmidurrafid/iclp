const db = require('../../db/index');
const fs = require('fs');
module.exports = {
    setQuiz : (data, callback) => {
                db.query(`insert into quiz(course_id,topic_id,quiz) values('${data.courseID}','${data.topicID}','${data.quiz}')`,
                [JSON.stringify(data.quiz)],
                (error, results, fields) => {
                    if(error){
                        return callback(error);
                    }
                    callback(null,results);

                }
            );
    }
}