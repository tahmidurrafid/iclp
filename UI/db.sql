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
-- INSERT INTO user(name, email, password) VALUES('rhythm', 'a', 'b');