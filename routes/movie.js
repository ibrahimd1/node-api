var express = require("express");
var router = express.Router();

//models
const Movie = require("../models/Movie.js");

router.get("/", (req, res) => {
  const promise = Movie.aggregate([
    {
      $lookup: {
        from: "directors",
        localField: "director_Id",
        foreignField: "_id",
        as: "director"
      }
    },
    {
      $unwind: "$director"
    }
  ]);
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/top10", (req, res) => {
  const promise = Movie.find({})
    .limit(10)
    .sort({ imdb_score: 1 });
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/:movie_id", (req, res) => {
  const promise = Movie.find({ _id: req.params.movie_id });
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/:movie_id", (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {
    new: true
  });
  promise
    .then(data => {
      if (!data) {
        next({ code: -1, message: "The movie was not found!" });
      }
      res.json({ statusCode: 1, message: "Success!" });
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/:movie_id", (req, res) => {
  const promise = Movie.findOneAndDelete(req.params.movie_id);
  promise
    .then(data => {
      res.json({ statusCode: 1, message: data.id + "id deleted" });
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/", function(req, res, next) {
  const { title, category, country, year, imdb_score, director_Id } = req.body;

  const movie = new Movie({
    title: title,
    category: category,
    country: country,
    year: year,
    imdb_score: imdb_score,
    director_Id: director_Id
  });

  const promise = movie.save();
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/between/:start_date/:end_date", (req, res) => {
  const { start_date, end_date } = req.params;
  const promise = Movie.find({
    year: { $gte: parseInt(start_date), $lte: parseInt(end_date) }
  });
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
