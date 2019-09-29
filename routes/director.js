const mongoose = require("mongoose");
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

router.get("/:director_id", (req, res) => {
  const promise = Director.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.director_id)
      }
    },
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

router.put("/:director_id", (req, res, next) => {
  const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {
    new: true
  });
  promise
    .then(data => {
      if (!data) {
        next({ code: -1, message: "The director was not found!" });
      }
      res.json({ statusCode: 1, message: "Success!" });
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/:director_id", (req, res) => {
  const promise = Director.findOneAndDelete(req.params.director_id);
  promise
    .then(data => {
      res.json({ statusCode: 1, message: data.id + "id deleted" });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
