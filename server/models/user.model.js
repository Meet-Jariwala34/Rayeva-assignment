const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    mood : {
        type : Number,
        default : 0,
    },
    lastConversation : {
        type : Array,
    }
});

//MODELS
const User = mongoose.model('User', userSchema);

module.exports = User;