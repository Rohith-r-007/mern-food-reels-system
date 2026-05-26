// creaing the server

const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes.js');
const foodRoutes = require('./routes/food.routes.js');
const foodPartnerRoutes = require('./routes/food-partner.routes.js');

const cors = require('cors');

const app = express();// creating an instance of express

// middlewares
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true // to allow cookies to be sent in cross-origin requests
}));
app.use(cookieParser()); // to store tokens in cookies
app.use(express.json()); // to read req.body in json format

app.get('/', (req, res) => {
    res.send('Hello World!'); //testing the server
});

app.use('/api/auth', authRoutes); // all auth related routes will start with /api/auth
app.use('/api/food', foodRoutes); // all food related routes will start with /api/food
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;