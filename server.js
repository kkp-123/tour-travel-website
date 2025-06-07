console.log("server file is running")

const express = require("express")
const app = express();
const db = require("./db")
const User = require("./models/user")
require('dotenv').config();
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');



app.use(express.static('public'))
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const templete_path = path.join(__dirname,"templetes/views");
const partial_path = path.join(__dirname,"templetes/partials");

app.set('view engine', 'hbs');
app.set('views',templete_path);
hbs.registerPartials(partial_path);


// for session
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }));


// import user routes

const userRoutes = require("./routes/userRoutes")
app.use("/",userRoutes)

// import pages routes

const pageRoutes = require("./routes/pagesRoutes")
app.use("/",pageRoutes)


// import package routes

const packageRoutes = require("./routes/packageRoutes")
app.use("/",packageRoutes)

// import admin toutes

const adminRoutes = require("./routes/adminRoutes")
app.use("/",adminRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listen on port ${port}`);
})
