const express = require("express");
const router = express.Router();
const app = express();
const User = require("../models/user");
const Tour = require("../models/tour");
const path = require("path");
const Booking = require("../models/bookings");
const Subscribe = require("../models/subscribe");
const session = require("express-session");
const { ifError } = require("assert");


// home page of admin
router.get("/admin",async(req,res)=>{
    if(!req.session.userid)
        {
            res.render(path.join("login"))
        }
    if(req.session.usertype == "admin")
    {
  const userCount = await User.countDocuments();
  const tourCount = await Tour.countDocuments();
  const bookingCount = await Booking.countDocuments();
  const subscribeCount = await Subscribe.countDocuments();
  const recentTours = await Tour.find().sort({ _id:-1 }).limit(3);

    res.render("admin",{userCount,tourCount,bookingCount,subscribeCount,recentTours});
    }

})

router.get("/addtour", async(req,res)=>{
    res.render("addTour");

})

// add tour in database
router.post("/addtour",async(req,res)=>{

    const data = await req.body;
    const addtour = new Tour(data);
    const response = await addtour.save();
    console.log(response);
    res.render("admin");
})
// view user

router.get("/viewuser",async(req,res)=>{
    const users = await User.find().sort();
    res.render("viewuser",{users})
})

// logout
router.get("/logout",async(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
        console.log(err)
        return res.status(500).send("unable to logout")
        }
        res.clearCookie('connect.sid');
        res.redirect("/login");
    })
})
router.get("/adminbooking",async(req,res)=>{
    const data = await Booking.find();
    res.render("adminbooking",{data});
})

// user details
router.get("/userdetails/:id",async(req,res)=>{
    const userid = req.params.id;
    const data = await User.findOne({_id:userid});
    console.log(data);
    res.render("userdetails",{data});
})

// delete user
router.get("/userdelete/:id",async(req,res)=>{
    const userid=req.params.id;
    await User.deleteOne({_id:userid});
    res.render("viewuser");
})
module.exports = router; 
