let mongoose = require('mongoose');

//create a model class
let movieModel = mongoose.Schema({
    title: String,
    Rating_IMDB: Number,
    Year: String,
    Price: String
},
{
    collection: "movies"
});

module.exports = mongoose.model('Movie', movieModel);