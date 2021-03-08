const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController")

const guest = require('../app/http/middlewares/guest')

function initRoutes(app) {


    //ROUTES

    // home route
    app.get("/", homeController().index)



    //cart route
    app.get("/cart", cartController().index)




    //login route
    app.get("/login", guest, authController().login)

    app.post("/login", authController().postLogin)



    //Register route
    app.get("/register", guest, authController().register)

    app.post("/register", authController().postRegister)


    app.post("/logout", authController().logout)


    app.post("/update-cart", cartController().update)
}


module.exports = initRoutes;