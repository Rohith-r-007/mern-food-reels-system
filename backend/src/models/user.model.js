const mongoose = require('mongoose');

// creating user structure
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }
},
{
    timestamps: true // to know when the user was created and updated
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;