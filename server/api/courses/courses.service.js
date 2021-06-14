const db = require('../../db/index');
const util = require('util');
const coursesController = require('./courses.controller');

const query = util.promisify(db.query).bind(db);

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

    saveVideo : async (data, callback) => {
        let response = await query(`INSERT INTO courseMedia(course_id, topic_id, media_type, name) 
            VALUES(${data.course_id}, ${data.topic_id}, "mp4", "${data.name}")`);
        let id = response.insertId;
        let name = `storage/uploads/video_${ data.course_id + "_" + data.topic_id + "_" + id}.mp4`;

        db.query(`UPDATE courseMedia SET link = "${name}" WHERE media_id = ${id}`, 
            (err, result, fields) =>{
                let data = {
                    path : name
                };
                callback(err, data);
            })
    },

    create : (data, callback) => {
        let queryString = `INSERT INTO course(title, brief, instructor_id) 
        VALUES(?, ?, ?)`;
        let param = [data.body.title, data.body.brief, data.user.result.id];
        console.log(param);
        if(data.body.id != 0){
            queryString = `UPDATE course SET 
                title = "${data.body.title}", 
                brief =  "${data.body.brief}"
                WHERE id = ${data.body.id}`;
                param = [data.body.title, data.body.brief, data.body.id]
        }
        db.query( queryString,
            param,
            (err, result, field) => {
                if(err)
                    console.log(err);
                else 
                    console.log("success");
                return callback(err, result);
            }
        )
        
    },

    saveTopic : (data, callback) => {
        db.query(`INSERT INTO courseTopic(course_id, topic_id, title) 
        VALUES( ${data.course.id}, ${data.course.topic.id}, "${data.course.topic.title}") ON DUPLICATE KEY UPDATE    
        title="${data.course.topic.title}"` , (err, result, field) => {
            callback(err, result);
        })
    },

    saveMedia : async (data, callback) => {
        ans = await query(`INSERT INTO courseMedia(course_id, topic_id, media_type)
                VALUES(${data.course_id}, ${data.topic_id}, "${data.media_type}")`);
        
        let mediaId = ans.insertId;                
        let link = `${"storage/uploads/" + "content_" + data.course_id + "_" + data.topic_id + 
        "_" + mediaId + "." + data.media_type}`

        ans = await query(`UPDATE courseMedia 
            SET link = "${link}"
            WHERE media_id = ${mediaId}`);

        return {
            link : link,
            media_id : mediaId
        };
    },

    updateContent : (req, callback) => {
        db.query(`UPDATE courseTopic SET content = ? , html = ?
        WHERE course_id = ${req.body.id} AND topic_id = ${req.body.topic.id}`,
        [JSON.stringify( req.body.topic.content) , req.body.topic.html],
        (err, result, fields) => {
            callback(err, result);
        })

    },

    getFullCourse : async (id, callback) => {
        let course = await query(`SELECT * FROM course WHERE id = ${id}`);
        course = course[0];

        let topics = await query(`SELECT * FROM courseTopic WHERE course_id = ${id} ORDER BY topic_id ASC`)
        course.topics = topics;
        let media = await query(`SELECT * FROM courseMedia WHERE course_id = ${id}`);
        course.media = media;
        return course;

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
    getAllForInstructor : (data, callback) => {
        db.query(`SELECT * FROM course WHERE instructor_id = ${data.user_id}`, 
            (err, results, fields) => {
                callback(err, results);
            })
    }
};