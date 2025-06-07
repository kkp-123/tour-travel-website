const mongoose = require("mongoose");

// define the person schema

const abcSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
    }})

const Abc = mongoose.model('Abc',abcSchema);
module.exports = Abc;