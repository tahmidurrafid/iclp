const db = require('../../db/index');
const fs = require('fs');
module.exports = {
    setQuiz : (data, callback) => {
                db.query(`insert into quiz(course_id,topic_id,quiz) values('${data.courseID}','${data.topicID}','${data.quiz}')`,     
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
    setCategoryQuiz : (data, callback) => {
        db.query(`update category set quiz='${data.quiz}' where id=${data.categoryID}`,
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            callback(null,results);

        });
    },
    categoryquizData: (data, callback)=>{
        db.query(`select * from category WHERE id=${data}`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        );

    },
    skillTest : (data, callback) => {
        db.query(`insert ignore into categorySkill (user_id,category_id,skill) values(${data.userId},${data.categoryId},'${data.skill}')`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    db.query(`update categorySkill set skill='${data.skill}' where user_id=${data.userId} and category_id=${data.categoryId}`,
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
} 