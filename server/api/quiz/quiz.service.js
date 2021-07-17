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
    },
    quizData: (data, callback)=>{
        db.query(`select * from quiz WHERE id=${data}`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        );

    },
    topicName: (data, callback)=>{
        db.query(`select title from courseTopic WHERE course_id=${data.courseID} and topic_id=${data.topicID}`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        );

    },
    userQuiz : (data, callback) => {
        db.query(`insert ignore into userQuiz (user_id,quiz_id,obtained_mark) values(${data.userId},${data.quizId},${data.obtainedMark})`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    db.query(`update userQuiz set obtained_mark=${data.obtainedMark} where user_id=${data.userId} and quiz_id=${data.quizId} and obtained_mark<${data.obtainedMark}`,
                        (error, results, fields) => {
                            if(error){
                                return callback(error);
                            }
                            else{
                                return callback(null, results);
                            }
                        }
                    );
                   
                }
            }
        );
    },
    allCourses: (callback)=>{
        db.query(`select id,title from course`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        );

    },
} 