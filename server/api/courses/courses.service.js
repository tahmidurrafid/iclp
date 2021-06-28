const db = require('../../db/index');
const util = require('util');
const coursesController = require('./courses.controller');

const query = util.promisify(db.query).bind(db);

module.exports = {
    getAll : (data, callback) => {
        console.log(data.search)
        let categoryFilter = "";
        let searchString = "";
        let searchParams = [];
        if(data.search){
            let splits = data.search.split(" ");
            if(splits.length){
                searchString = "AND ("
                for(let i = 0; i < splits.length; i++){
                    searchString += "c.title LIKE ? ";
                    if(i != splits.length - 1){
                        searchString += "OR ";
                    }else{
                        searchString += ")";
                    }
                    splits[i] = "%" + splits[i] + "%"; 
                }
                searchParams = splits;                
            } 
        }
        console.log(searchString);
        if(data.category && data.category.length){
            categoryFilter = "AND c.category IN (";
            for(let i = 0; i < data.category.length; i++){
                categoryFilter += data.category[i];
                if(i != data.category.length -1){
                    categoryFilter += ', ';
                }
            }
            categoryFilter += ")";
            console.log(categoryFilter);
        }
        db.query(`SELECT c.id as id,
                        c.title as title,
                        c.category as category,
                        c.brief as brief
                        FROM course c
                        WHERE 1 = 1
                        ${categoryFilter} ${searchString}
                        `,
                        searchParams,

            (error, results, fields) => {
                if(error){
                    console.log(error);
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )
    },

    saveAssignment : (data, callback) => {
        console.log(data);
        let withFile =  data.location.length;
        queryString = {
            withFile : {
                str : `INSERT INTO assignment(id, course_id, brief, file_link, file_name, seq, total_mark, title) 
                VALUES(${data.topic_id}, ${data.course_id}, ?, ?, ?, ${data.seq}, ${data.marks}, ?) 
                ON DUPLICATE KEY UPDATE
                brief = ?,
                file_link = ?,
                file_name = ?,
                seq = ${data.seq},
                total_mark = ${data.marks}, 
                title = ?`,
                param : [data.content, data.location,  data.name, data.title, 
                    data.content, data.location, data.name, data.title]
            },
            withoutFile : {
                str : `INSERT INTO assignment(id, course_id, brief, seq, total_mark, title) 
                VALUES(${data.topic_id}, ${data.course_id}, ?, ${data.seq}, ${data.marks}, ?) 
                ON DUPLICATE KEY UPDATE
                brief = ?,
                seq = ${data.seq},
                total_mark = ${data.marks}, 
                title = ?`,
                param : [data.content, data.title,  data.content, data.title]
            }
        }

        
        db.query(withFile ? queryString.withFile.str :  queryString.withoutFile.str , 
            withFile ? queryString.withFile.param : queryString.withoutFile.param , 
            (err, result, fields) =>{
                if(err)
                    console.log(err);
                callback(err, data);
        })
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
        let queryString = `INSERT INTO course(title, brief, instructor_id, category) 
        VALUES(?, ?, ?, ?)`;
        console.log(data.body);
        let param = [data.body.title, data.body.brief, data.user.result.id, data.body.category];
        console.log(param);
        if(data.body.id != 0){
            queryString = `UPDATE course SET 
                title = ?, 
                brief =  ?,
                category =  ?
                WHERE id = ?`;
                param = [data.body.title, data.body.brief ,data.body.category, data.body.id]
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

    getFullCourse : async (data, callback) => {
        let course = await query(`SELECT * FROM course WHERE id = ${data.course_id}`);
        course = course[0];

        let topics = await query(`SELECT * FROM courseTopic WHERE course_id = ${data.course_id} ORDER BY topic_id ASC`)
        course.topics = topics;
        course.topics.map( (e) => {
            e.type = "topic";
            return e;
        });

        let enrolled = await query(`SELECT * FROM enrollment WHERE user_id = ${data.user.id} AND 
                course_id = ${data.course_id}`);
        course.enrolled = enrolled.length > 0;
        let assignment = await query(`SELECT * FROM assignment WHERE course_id = ${data.course_id} ORDER BY id ASC`);
        assignment.map( e => {
            e.type = "assignment";
            return e;
        })
        course.topics = course.topics.concat(assignment);
        let media = await query(`SELECT * FROM courseMedia WHERE course_id = ${data.course_id}`);
        course.media = media;
        return course;

    },

    get : async (data, callback) => {
        let topics = await query(`SELECT topic_id, title FROM courseTopic WHERE course_id = ${data.course_id}
            ORDER BY topic_id ASC`);
        db.query(`SELECT c.id as id,
                        c.title as title,
                        c.category as category,
                        c.brief as brief,
                        instructor.name as i_name
                        FROM course c join user instructor on (c.instructor_id = instructor.id)
                        WHERE 1 = 1 AND
                        c.id = ${data.course_id}
                        `,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    results[0].topics = topics;
                    console.log(results);
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
    },
    getAllForUser : (data, callback) => {
        db.query(`SELECT * FROM course JOIN enrollment on (course.id = enrollment.course_id) WHERE 
            user_id = ${data.user_id}`, 
            (err, results, fields) => {
                callback(err, results);
            })
    },

    enroll : (data, callback) => {
        console.log(data);
        db.query(`INSERT INTO enrollment(user_id, course_id) VALUES(? , ?)`,
            [data.user_id, data.course_id],
            (err, res) => {
                callback(err, res);
            }
        )
    },
    enrolled : (data, callback) => {
        db.query(`SELECT * FROM enrollment WHERE user_id = ? AND course_id = ?`,
        [data.user_id, data.course_id],
            (err, res) => {
                let ret = {
                    enrolled : res.length > 0
                }
                callback(err, ret);
            }
        )        
    },
    deleteTopic : async (data, callback) => {
        let res = query(`DELETE FROM courseMedia WHERE course_id = ${data.req.course_id} AND topic_id = ${data.req.topic_id}`);
        res = query(`DELETE FROM courseTopic WHERE course_id = ${data.req.course_id} AND topic_id = ${data.req.topic_id}`);
        callback(null, {success : 1});

    },
    deleteAssignment : async (data, callback) => {
        res = query(`DELETE FROM assignment WHERE course_id = ${data.req.course_id} AND id = ${data.req.topic_id}`);
        callback(null, {success : 1});
    }
};