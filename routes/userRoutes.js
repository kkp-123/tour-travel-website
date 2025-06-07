const express = require("express");
const router = express.Router();
const app = express();
const User = require("../models/user");
const session = require("express-session");
const path = require("path");
const Booking = require("../models/bookings");
const Subscribe = require("../models/subscribe");
// const {jwtAuthMiddleware , generateToken} = require('./../jwt');

// register user 
router.post('/registeruser', async function (req, res) {

    try {
        // const {name,age,mobile,email,address,username,password} = req.body // assuming the request bosy constains the person data

        const data = req.body;
        console.log(data);
        const newUser = new User(data);

        // const newUser = new User({name,age,mobile,email,address,username,password});

        const response = await newUser.save();
        console.log("data saved");


        // const token = generateToken(response.username);
        // console.log("Token is ",token);
        // res.status(200).json({ success: "sucess", response: response })
        res.render("login")

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// login user

router.post('/loginuser', async (req, res) => {

    try {
        const data = req.body;
        const { username, password, usertype } = req.body;
        const userfind = await User.findOne({ username, password, usertype });

        if (userfind) {
            req.session.userid = userfind._id;
            req.session.fullname = userfind.name;
            req.session.usertype = userfind.usertype;

            if(req.session.usertype == "admin")
            {
                res.redirect("/admin");
            }
            else{

                res.redirect("/");
            }
            // console.log(userfind._id);
            // console.log("user is find");
        }
        else {
            console.log(data);
            console.log("no user find");
            res.render("login");
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// booking tour

router.post("/book",async(req,res)=>{
    if(!req.session.userid)
        {
            res.render(path.join("login"))
        }
        else
        {
            const {name,title,catagory,contactno,email,departure_date,persons,price,userid,tourid} = req.body;
            const book = new Booking({name,title,catagory,contactno,email,departure_date,persons,price,userid,tourid});
            const data = await book.save();
            console.log(data);
            const sucess = "Your destination package sucessfully book."
            res.render("bookingdetails",{data,sucess});
        }  
      
   
})
router.get("/bookingdetails",async(req,res)=>{
    if(!req.session.userid)
    {
        res.render(path.join("login"))
    }
    else{
        const userid = req.session.userid;
        const data = await Booking.find({userid:userid});
        res.render("userbookingdetails",{data});
    }
})
router.get("/forgotpassword",async(req,res)=>{
    res.render("forgotpassword");
})
router.post("/forgotpassword",async(req,res)=>{

    const{username,email,password} = req.body;
    const user = await User.findOne({username,email});
    if(!user)
    {
        return res.status(400).send("user not found with provided username and email");
    }
    user.password = password;
    await user.save();
    res.render("login");
})

// subscribe
router.post("/subscribe",async(req,res)=>{

    const data = req.body;
    const subscribe = new Subscribe(data);
    const response = await subscribe.save();
    res.render("index");

})







module.exports = router; 