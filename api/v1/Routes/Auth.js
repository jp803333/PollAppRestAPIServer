const express = require("express");
const JWT = require("jsonwebtoken");

const SALT = process.env.SALT;

const authenticateToken = require("../../../utils/VerifyToken");
const User = require("../../../Models/User");

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  res.send("Welcome to Auth ");
});

router.post("/signUp", (req, res) => {
  const user = User({
    Name: req.body.name,
    Password: req.body.password,
    Username: req.body.username,
    Email: req.body.email,
  });
  user
    .save()
    .then(() => {
      const token = JWT.sign(req.body, SALT, {
        expiresIn: "1d",
      });
      res.json({
        token,
      });
    })
    .catch((e) => {
      res.json({
        message: `${e}`,
      });
    });
});

router.post("/logIn", (req, res) => {
  User.findOne({ Username: req.body.username })
    .then((user) => {
      if (user.Password === req.body.password) {
        const token = JWT.sign(req.body, SALT, {
          expiresIn: "1d",
        });
        res.json({
          token,
        });
      } else {
        res.json({
          message: "Wrong Password",
        });
      }
    })
    .catch((err) => {
      res.status(401).json({ message: "Unable to locate the user." });
      // res.json({ });
    });
});

router.post("/forgotPassword", (req, res) => {
  //TODO Forgot Password
  res.json({ message: "not yet done" });
});

router.post("/changePassword", (req, res) => {
  //TODO Change Password
  res.json({ message: "not yet done" });
});

module.exports = router;
