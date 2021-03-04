
const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
    return {
        login(req,res) {
            res.render('auth/login')
        },
        postLogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    
                    return next(err)
                }
                if (!user) {
                    req.flash('error', info.message)
                    
                    return res.redirect('/login')
                }
                req.login(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect('/')
                })
            })(req,res,next)
        },


        register(req,res) {
            res.render('auth/registration')
        },
        async postregister(req, res) {
            const { name, email, password} = req.body
            
            //validate request
            if (!name || !email || !password) {
                req.flash('error','All fields are requred')
                return res.redirect('/register')
            }

            User.exists({ email: email }, (err, res) => {
                if (result) {
                    req.flash('error', 'email already exists')
                    return res.redirect('/register')
                }
            })


        //hash password
            const hashedpassword =await bcrypt.hash(password,10)
            const user = new User({
                name: name,
                email: email,
                password:hashedpassword
            })

            user.save().then(() => {

                return res.redirect('/')
                
            }).catch(err => {
                req.flash('error', 'something went wrong')
                return res.redirect('/register')
            })
            console.log(req.body)
        }
    }
}


module.exports=authController