const mn = require('mongoose');

require('dotenv').config();
// define the mongoDB connection URL
// const mongoUrl ='mongodb://127.0.0.1:27017/project'
const mongoUrl = process.env.DB_LOCAL;
// const mongoUrl = "mongodb+srv://krishpatel1604:Kp902319@cluster0.cy1rf.mongodb.net/";

mn.connect(mongoUrl,{

    // useNewUrlParser: true,
    // userUnifiedTopology : true
})

const db = mn.connection;

db.on('connected' , () => {
    console.log("Connected sucessfully")
})
db.on('error' , (err) => {
    console.log("mongodb connection error",err)
})
db.on('disconnected' , () => {
    console.log("mongodb disconnected")
})

// Export the databse connection

module.exports = {
    db
};