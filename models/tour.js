const mongoose = require("mongoose");

// define the person schema

const tourSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type :String,
    
    },
    price:{
        type :Number,
    },
    duration : {
        type : String,
    },
    start_location: {
        type: String,
        
    },
    end_location: {
        type: String,
        
    },
    img_url : {
        type : String
    },
    created_at : {
        type : Date,
        default:Date.now()
    }
    
});

// create person model

const Tour = mongoose.model('Tour',tourSchema);
module.exports = Tour;