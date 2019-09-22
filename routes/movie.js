var express = require("express");
var router = express.Router();

//models
const Movie = require("../models/Movie.js");

router.post("/", function(req, res, next) {
  const { title, category, country, year, imdb_score } = req.body;

  const movie = new Movie({
    title: title,
    category: category,
    country: country,
    year: year,
    imdb_score: imdb_score
  });

  // movie.save((err, data) => {
  //   if (err) res.json(err);
  //   res.json(data);
  // });

  const promise = movie.save();
  promise
    .then(data => {
      res.json({ status: 1 });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
