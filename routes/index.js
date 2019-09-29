const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Models
const User = require("../models/User.js");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/register", function(req, res, next) {
  const { userName, passWord } = req.body;

  bcrypt.hash(passWord, 10).then(hash => {
    const user = new User({
      userName,
      passWord: hash
    });

    const promise = user.save();
    promise
      .then(veri => {
        res.json(veri);
      })
      .catch(hata => {
        res.json(hata);
      });
  });
});

router.post("/authenticate", (req, res) => {
  const { userName, passWord } = req.body;
  User.findOne(
    {
      userName: userName
    },
    (err, user) => {
      if (err) res.json(err);

      if (!user) {
        res.json({
          status: false,
          message: "Authentication failed. User not found!"
        });
      } else {
        // @ts-ignore
        bcrypt.compare(passWord, user.passWord).then(result => {
          if (!result) {
            res.json({
              status: false,
              message: "Authentication failed. Wrong password"
            });
          } else {
            const payLoad = {
              userName
            };
            const token = jwt.sign(payLoad, req.app.get("api_secret_key"), {
              expiresIn: 720 //12 saat
            });

            res.json({
              status: true,
              token
            });
          }
        });
      }
    }
  );
});

module.exports = router;
