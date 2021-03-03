const express = require("express");
const path = require("path"); // core module or inbuild module.

const app = express(); // express() returns the object of express , which is stored in app variable.

// CONFIGURING THE TEMPLATE ENGINE
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");



const PORT = process.env.PORT || 3000;
// process.env :  it is stored inside node process
// if there exists a varible PORT ,we will use that.
// if not present , we will run it on 3000.



//ASSETS  ---> passing our static folder ---> public ---> to make it take css also to browser server.
app.use(express.static('public'));


// SET TEMPLATE ENGINE
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"))
app.set("view engine", "ejs");



//ROUTES

// home route
app.get("/", (req, res) => {
    res.render("home");

})

//cart route
app.get("/cart", (req, res) => {
    res.render("customers/cart");


})


//login route
app.get("/login", (req, res) => {
    res.render("auth/login");

})

//Register route
app.get("/register", (req, res) => {
    res.render("auth/register");

})






app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});