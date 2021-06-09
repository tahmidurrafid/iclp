CREATE TABLE user(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(30),
	password VARCHAR(30), 
    name VARCHAR(30),
    dateofbirth date,
    phone VARCHAR(50),
    country VARCHAR(50),
    institute VARCHAR(50),
    address VARCHAR(50),
    profile_photo  VARCHAR(50)    
)

CREATE TABLE Course (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	instructor_id INT(6),
	title VARCHAR(100),
	category INT(50),
	brief TEXT
)

CREATE TABLE courseTopic(  
    course_id int(6),
    topic_id int,
    sequence_ int,
    title varchar(255),
    content text,
    PRIMARY KEY (course_id, topic_id)
);
-- INSERT INTO user(name, email, password) VALUES('rhythm', 'a', 'b');
CREATE TABLE courseMedia(  
    media_id int NOT NULL primary key AUTO_INCREMENT comment 'primary key',
    course_id int,
    topic_id int,
    media_type varchar(20),
    link varchar(255)
);