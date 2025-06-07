const mongoose = require("mongoose");

const subschema = new mongoose.Schema({

    email:{
        type:String
    }
})
const Subscribe = mongoose.model('Subscribe',subschema);
module.exports = Subscribe;