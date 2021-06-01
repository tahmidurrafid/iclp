const db = require('../../db/index');

module.exports = {
    getAll : (data, callback) => {
        db.query(`SELECT c.id as id,
                        c.title as title,
                        c.category as category,
                        c.brief as brief
                        FROM course c
                        WHERE 1 = 1
                        ${data.category? 'AND c.category = '+ data.category : ''}
                        `,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )
    },
    get : (data, callback) => {
        db.query(`SELECT c.id as id,
                        c.title as title,
                        c.category as category,
                        c.brief as brief,
                        instructor.name as i_name
                        FROM course c join user instructor on (c.instructor_id = instructor.id)
                        WHERE 1 = 1 AND
                        c.id = ${data.id}
                        `,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )
    },
    categories : (data, callback) => {
        db.query(`SELECT *, 
                        (SELECT count(*) FROM course WHERE course.category = cat.id) as count
                FROM category cat`,
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