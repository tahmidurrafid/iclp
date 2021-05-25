const express = require("express");
const usersRoute = require('./api/users/users.route');

const app = express();
app.use(express.json());

app.use('/api/users', usersRoute);

app.listen(process.env.PORT || '3000', () => {
    console.log("Hello world");
});