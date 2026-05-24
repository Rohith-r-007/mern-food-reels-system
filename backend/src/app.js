// creaing the server

const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes.js');

const app = express();// creating an instance of express

// middlewares
app.use(cookieParser()); // to store tokens in cookies
app.use(express.json()); // to read req.body in json format

app.get('/', (req, res) => {
    res.send('Hello World!'); //testing the server
});

app.use('/api/auth', authRoutes); // all auth related routes will start with /api/auth

module.exports = app;