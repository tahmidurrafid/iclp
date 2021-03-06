const express = require("express");
const usersRoute = require('./api/users/users.route');
const coursesRoute = require('./api/courses/courses.route');
const adminRoute = require('./api/admin/admin.route');
const gameRoute = require('./api/game/game.route');
const assignmentRoute = require('./api/assignment/assignment.route');
const quizRoute = require('./api/quiz/quiz.route');

const app = express();

app.use(express.json());

app.use('/storage', express.static('storage'))

const cors = require('cors');
app.use(cors());

app.use('/api/users', usersRoute);
app.use('/api/courses', coursesRoute);
app.use('/api/admin', adminRoute); 
app.use('/api/game', gameRoute); 
app.use('/api/assignment', assignmentRoute);
app.use('/api/quiz',quizRoute);

app.listen(process.env.PORT || '3000', () => {
    console.log("Hello world");
});