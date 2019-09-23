const express = require("express");
const router = express.Router();

const Director = require("../models/Director.js");

router.get("/", (req, res) => {
  const promise = Director.aggregate([
    {
      $lookup: {
        from: "movies",
        localField: "_id",
        foreignField: "director_Id",
        as: "movies"
      }
    },
    {
      $unwind: {
        path: "$movies",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
          surname: "$surname",
          bio: "$bio"
        },
        movies: {
          $push: "$movies"
        }
      }
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        surname: "$_id.surname",
        bio: "$_id.bio",
        movies: "$movies"
      }
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

router.post("/", (req, res) => {
  const director = new Director(req.body);
  const promise = director.save();
  promise
    .then(data => {
      res.json({ statusCode: 1, message: "Success!" });
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/:director_id", (req, res) => {
  const promise = Director.findById(req.params.director_id);
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/:director_id", (req, res) => {
  const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {
    new: true
  });
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/:director_id", (req, res) => {
  const promise = Director.findByIdAndRemove(req.params.director_id);
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/best10movie");

module.exports = router;
