let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');
 
//create a reference to the model
let Movie = require('../models/movie');

//Displays MovieList
module.exports.displayMovieList = (req, res, next) => {
    Movie.find((err, MovieList) =>{
        if (err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(MovieList);
            res.render('movie/list.ejs',
            {
                title: 'Movie List',
                 MovieList, displayName: req.user ? req.user.displayName : ''
            });
        }
    });
};

//Displays add page
module.exports.displayAddMoviePage = (req, res, next) => {
    res.render('movie/add', 
    {
        title: 'Add movie',
        displayName: req.user ? req.user.displayName : ''
    });    
}

module.exports.processAddPage = (req, res, next) => {
    let newMovie = Movie({
        "title": req.body.title,
        "Rating_IMDB": req.body.Rating_IMDB,
        "Year": req.body.Year,        
        "Price": req.body.Price
    })
    Movie.create(newMovie, (err, Movie) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the movielist
            res.redirect('/movie-list')
        }
    })
}

module.exports.displayEditMoviePage = (req, res, next) => {
    id = req.params.id;

    Movie.findById(id, (err, movieToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show the editview
            res.render('movie/edit', 
            {
                title: 'Edit Movie', movie: movieToEdit, 
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });    
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    
    let updatedMovie = Movie ({
        "_id": id,
        "title": req.body.title,
        "Rating_IMDB": req.body.Rating_IMDB,
        "Year": req.body.Year,
        "Price": req.body.Price
    });

    Movie.updateOne({_id: id}, updatedMovie, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the movielist
            res.redirect('/movie-list');
        } 
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id

    Movie.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the movielist
            res.redirect('/movie-list');
        } 
    })
}