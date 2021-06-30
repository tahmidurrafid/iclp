const db = require('../../db/index');

module.exports = {
    get : (data, callback) => {
        db.query(`SELECT * FROM assignment where id = ? AND course_id = ?`,
            [data.req.assignment_id, data.req.course_id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )
    },

};