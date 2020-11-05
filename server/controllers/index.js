let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enabel jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/DB');

//create the user model instance
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res ,next) =>{
    res.render('index', {title: "Home", displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res ,next) =>{
    res.render('index', {title: "About", displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProductsPage = (req, res ,next) =>{
    res.render('index', {title: "Products", displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res ,next) =>{
    res.render('index', {title: "About", displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res ,next) =>{
    res.render('index', {title: "Contact us", displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) =>{
    //check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: 'Login',
            messages: req.flash('login'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) =>{
    passport.authenticate('local',    
    (err, user, info) => {
        if (err) 
        {
              return next(err);  
        }        
        // if there is a user login errot
        if (!user) 
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) =>{
            //server error
            if (err)
            {
                return next(err);    
            }

            const payload =
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 //one week
            })
            /* WIP
            res.json({success: true, msg: 'User Logged in Successfully', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken});
            */
            return res.redirect('/movie-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    //instantiate a user object
    let newUser = new User({
        username: req.body.username,
        // password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });
    
    User.register(newUser, req.body.password, (err) => {
        if (err) 
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already exsits');
            }          
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });    
        }
        else
        {
            // if no error exists, then registration is successful
            
            // redirect user and authenticated them

            // res.json({success: true, msg: 'User Registered Successfully'});

            return passport.authenticate('local')(req, res, () =>{
                console.log('registration successful');
                res.redirect('/movie-list');
            })
        }
    })
}

module.exports.performLogout = (req, res, next) =>{
    req.logout();
    res.redirect('/');
}