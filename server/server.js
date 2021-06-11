const express = require("express");
const usersRoute = require('./api/users/users.route');
const coursesRoute = require('./api/courses/courses.route');
const adminRoute = require('./api/admin/admin.route');

const app = express();

app.use(express.json());

app.use('/storage', express.static('storage'))

const cors = require('cors');
app.use(cors());

app.use('/api/users', usersRoute);
app.use('/api/courses', coursesRoute);
app.use('/api/admin', adminRoute); 

app.listen(process.env.PORT || '3000', () => {
    console.log("Hello world");
});