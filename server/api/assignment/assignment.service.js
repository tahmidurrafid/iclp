const db = require('../../db/index');

module.exports = {
    get : (data, callback) => {
        db.query(`SELECT * FROM assignment where id = ? AND course_id = ?`,
            [data.req.assignment_id, data.req.course_id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    let ret = results[0];
                    db.query(`SELECT * FROM submission WHERE course_id = ? AND assignment_id = ? AND 
                        user_id = ?`,
                        [data.req.course_id, data.req.assignment_id, data.user.id],
                        (err, results, fields) => {
                            if(err){
                                callback(error);
                                return;
                            }
                            ret.submissions = results;
                            callback(err, ret);
                        }
                    )
                }
            }
        )
    },

    submit : (data, callback) => {
        let fileName = data.user.id + "_" + data.course_id + "_" + data.assignment_id + "_" + data.file_name;
        fileName = "storage/uploads/submission/" + fileName;
        let date = new Date();
        console.log(date);
        db.query(`INSERT INTO submission(user_id, course_id, assignment_id, file_link, mark, submission_time) 
            VALUES(?, ?, ?, ?, ?, ?)`,
            [data.user.id, data.course_id, data.assignment_id, fileName, -1, date],
            (err, result, fields) => {
                if(err){
                    console.log(err);
                }else{
                    let res = {
                        path : fileName
                    }
                    callback(err , res);
                }
            }
        );
    },
    getByInstructor : (data, callback) => {
        db.query(`SELECT 
                s.id as submission_id ,s.user_id,  s.course_id, s.assignment_id, s.mark, 
                    s.file_link as submission_link, s.submission_time, 
                a.total_mark, a.title as assignment_title, a.file_link,
                c.instructor_id, c.title as course_title 
            from submission s JOIN assignment a 
            ON (s.assignment_id = a.id AND s.course_id = a.course_id) JOIN course c 
            ON (a.course_id = c.id)
            WHERE c.instructor_id = ${data.user.id}
            ORDER BY s.submission_time DESC` , 
            (err, res, fields) => {
                if(err){
                    console.log(err);
                }else{
                    // console.log(res);
                }
                callback(err, res);
            }    
        )
    },
    updateMark : (data, callback) => {
        db.query(`UPDATE submission SET mark = ? WHERE id = ?`, 
        [data.mark, data.submission_id], 
        (err, res, fields) => {
            callback(err, res);
        })
    }
};