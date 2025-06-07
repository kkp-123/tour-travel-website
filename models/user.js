const mongoose = require("mongoose");

// define the person schema

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age:{
        type : Number,
    
    },
    usertype:{
        type : String,
        enum: ['user','admin'],
        default: 'user'

    },
    mobile : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    address : {
        type : String,

    },
    username : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    createdAt: {
        type:Date,
        default:Date.now()
    }
    
});

// create person model

const User = mongoose.model('User',userSchema);
module.exports = User;