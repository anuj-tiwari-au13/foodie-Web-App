
const homeController = require('../app/controllers/homeController')
const authController = require('../app/controllers/authController')
const cartController = require('../app/controllers//customers/cartController')


function initRoutes(app) {    
    
    app.get('/', homeController().index)
    
    app.get('/login', authController().login)
    app.post('/login',authController().postLogin)
    
    app.get('/register', authController().register)
    app.post('/register',authController().postregister)

    app.get('/cart', cartController().index)
    
}
 
module.exports=initRoutes