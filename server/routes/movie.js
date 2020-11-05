let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

let movieController = require('../controllers/movie');

// helper function for guard purposes
function requreAuth(req, res, next)
{
    // check if user is logged in 
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


/* GET Route for the movies List page - READ Operation */
router.get('/', movieController.displayMovieList);

/* GET Route for displaying ADD page - CREATE Operation */
router.get('/add', requreAuth, movieController.displayAddMoviePage);

/* POST Route for processing ADD page - CREATE Operation */
router.post('/add', requreAuth,movieController.processAddPage);

/* GET Route for diplaying EDIT page - UPDATE Operation */
router.get('/edit/:id', requreAuth, movieController.displayEditMoviePage);

/* POST Route for proccessing EDIT page - READ Operation */
router.post('/edit/:id', requreAuth, movieController.processEditPage);

/* GET Route for DELETE page - DELETE Operation */
router.get('/delete/:id', requreAuth, movieController.performDelete);


module.exports = router;