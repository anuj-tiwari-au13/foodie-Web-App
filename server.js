const express = require("express");
const path = require("path"); // core module or inbuild module.

const app = express(); // express() returns the object of express , which is stored in app variable.

const PORT = process.env.PORT || 3000;
// process.env :  it is stored inside node process
// if there exists a varible PORT ,we will use that.
// if not present , we will run it on 3000.

// CONFIGURING THE TEMPLATE ENGINE
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
//
const mongoose = require('mongoose');
const session =require('express-session');
const { Cookie } = require('express-session');
const flash = require('express-flash');
const passport = require('passport');


//database connection
const url = "mongodb+srv://admin:anj1234@cluster0.8jt9w.mongodb.net/foodie?retryWrites=true&w=majority";
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});


const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('connection failed');
});

// passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


//ASSETS  ---> passing our static folder ---> public ---> to make it take css also to browser server.
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())


// SET TEMPLATE ENGINE
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"))
app.set("view engine", "ejs");


require('./routes/web')(app)



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});