const express = require("express");
const router = express.Router();
const Tour = require("../models/tour");
const session = require("express-session")



// post data

router.post('/package', async function (req, res) {

    try {
        // const {name,age,mobile,email,address,username,password} = req.body // assuming the request bosy constains the person data

        const data = req.body;
        console.log(data);
        const newTour = new Tour(data);

        // const newUser = new User({name,age,mobile,email,address,username,password});

        const response = await newTour.save();
        console.log("data saved");

        
        // const token = generateToken(response.username);
        // console.log("Token is ",token);
        res.status(200).json({success:"sucess",response:response})
    
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// boking and more details of destination
router.get('/package/:id', async (req, res) => {
    var num1,num2,num3;
    try {
        const desid = req.params.id;
        const data = await Tour.find({_id:desid});
        
        data.forEach(u =>{
            num1 = u.price;
            num2 = u.price * 2;
            num3 = u.price * 3;
    })
    const userid = req.session.userid
        
        res.render("booking",{data:data,num1:num1,num2:num2,num3:num3,userid:userid});
        
        
    }
    catch (err) {
        console.log("Error fetching persons", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;