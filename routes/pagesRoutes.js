const express = require("express");
const router = express.Router();
const app = express();
const session = require("express-session")
const path = require('path');
const Tour = require('../models/tour');
const Abc = require("../models/abc");
const User = require("../models/user");
const Booking = require("../models/bookings");

router.get('/register', function (req, res) {
    // res.send("Welcome to our web site tour&travells")
    res.render(path.join("register"));

})
router.get('/login',function (req,res){

    res.render(path.join("login"));
})

router.get('/',async(req,res)=>{
    
    const data = await Tour.find().limit(4);
    res.render("index",{data})
})

// get package

router.get('/package',async(req,res)=>
{
    if(!req.session.userid)
    {
        res.render(path.join("login"))
    }
    else
    {
        const destinations = await Tour.find();
        res.render("package",{destinations});
    }
})
router.get('/navbar', function (req,res){
    res.render("navbar2");
})
router.get('/abc', async(req,res)=>{
    var userid;
    const user = await User.find({username:"krish1604"});
    user.forEach(u =>{

            userid = u._id;
    })
    
    const abc = new Abc({userid:userid});
    const response = await abc.save();
    console.log(response);

})

// about us page
router.get("/aboutus",(req,res)=>{
    res.render("aboutus");
})


module.exports = router;