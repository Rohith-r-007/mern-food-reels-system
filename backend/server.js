// starting the server
require('dotenv').config(); // for using env variables

const app = require('./src/app.js'); //app itself
const connectDB = require('./src/db/db.js'); // connecting to datasbase

connectDB();// databse connection

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
