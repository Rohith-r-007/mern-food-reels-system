// starting the server

const app = require('./src/app.js'); //app itself
const connectDB = require('./src/db/db.js'); // connecting to datasbase

connectDB();// databse connection

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});