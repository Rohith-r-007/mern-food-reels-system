// starting the server
require('dotenv').config(); // for using env variables

const app = require('./src/app.js'); //app itself
const connectDB = require('./src/db/db.js'); // connecting to datasbase

connectDB();// databse connection

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});