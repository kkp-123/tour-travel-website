const mn = require('mongoose');
const User = require('./models/user');

require('dotenv').config();
// define the mongoDB connection URL
// const mongoUrl ='mongodb://127.0.0.1:27017/project'
// const mongoUrl = process.env.DB_LOCAL;
// const mongoUrl2 = "mongodb+srv://krishpatel1604:kp902319@cluster0.7pfbkr3.mongodb.net/"
// const mongoUrl = process.env.DB_URL;


const uri = "mongodb+srv://krishpatel1604:kp902319@cluster0.7pfbkr3.mongodb.net/test?retryWrites=true&w=majority"
mn.connect(uri,{
    ssl:true
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