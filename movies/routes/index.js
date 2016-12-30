var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

router.get('/', function(req, res) {
  res.redirect('/movies');
});

router.get('/movies', function(req, res) {
  var movieFilter = {},
    searchExists = false;
  
  if(req.query.director) {
    movieFilter.director = req.query.director; 
    searchExists = true;
  }
 
  Movie.find(movieFilter, function(err, movies, count) {
    res.render('movies', {'movies': movies, searchExists: searchExists, director: req.query.director });
  });
});

router.get('/api/movies', function (req, res) {
    if(req.query.director == undefined || req.query.director ==''){
        Movie.find({},function (err, movies,count) {
            res.json(movies.map(function (ele) {
                return {
                    'title':ele.title,
                    'director':ele.director,
                    'year':ele.year
                }
            }));
        });
    }
    else{
        Movie.find({'director':req.query.director},function (err, movies,count) {
            res.json(movies.map(function (ele) {
                return {
                    'title':ele.title,
                    'director':ele.director,
                    'year':ele.year
                }
            }));
        });
    }

});
router.post('/api/movies/create', function (req, res) {
   var movie = new Movie({
      title: req.body.title,
       director: req.body.director,
       year: parseInt(req.body.year)
   });
   movie.save(function (err, saved_movie, count) {
      if(err){
          console.log(err);
          return res.send(500,'error: could not create movie');
      }
       res.json({id:saved_movie.id});

   });
});


module.exports = router;
