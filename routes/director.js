const express = require("express");
const router = express.Router();

const Director = require("../models/Director.js");

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

module.exports = router;
