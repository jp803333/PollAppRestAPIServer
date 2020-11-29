const express = require("express");
const User = require("../../../Models/User");
const Poll = require("../../../Models/Poll");
const authenticateToken = require("../../../utils/VerifyToken");
const { json } = require("body-parser");

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  res.send("Welcome to poll router");
});

router.post("/getAllPolls", authenticateToken, async (req, res) => {
  User.findOne({ Username: req.body.username })
    .then(async (user) => {
      getPolls = [];
      for (let i = 0; i < user.Polls.length; i++) {
        poll = await Poll.findById(user.Polls[i]);

        Options = poll.Options.map((option) => {
          return {
            title: option.value,
            id: option._id,
            votes: option.votes,
          };
        });

        getPolls.push({
          pollID: poll._id,
          question: poll.Question,
          options: Options,
        });
      }
      // console.log(getPolls);
      res.json({ getPolls });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ message: err });
    });
});

router.post("/createPoll", authenticateToken, (req, res) => {
  User.findOne({ Username: req.body.username })
    .then((user) => {
      newPoll = Poll({
        Question: req.body.poll.question,
      });
      req.body.poll.options.forEach((option) => {
        newPoll.Options.push({ value: option.name });
      });
      try {
        newPoll.save();
        user.Polls.push(newPoll);
        user.save();
        res.json({ message: "poll created", id: newPoll._id });
      } catch (error) {
        console.log(error);
        res.json(error);
      }
    })
    .catch((err) => {
      res.status(401).json({ message: "User not found" });
    });
});

router.post("/:pollID/deletePoll", (req, res) => {
  User.findOneAndUpdate(
    { Username: req.body.username },
    { $pull: { Polls: req.params.pollID } },
    { new: true }
  )
    .then(async (user) => {
      try {
        await Poll.findByIdAndDelete(req.params.pollID);
        return user;
      } catch (e) {
        console.log(e);
        throw e;
      }
    })
    .then((user) => {
      console.log(user);
      res.json({ user });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/:pollID/createOption", (req, res) => {
  res.json({
    message: `welcome to create Option of a poll ${req.params.pollID}`,
  });
});

router.post("/:pollID/getDetails", (req, res) => {
  res.json({
    message: `welcome to get details of poll ${req.params.pollID}`,
  });
});

// Not sure if these below one's should be implemented or not
router.post("/:pollID/deleteOption/:optionID", (req, res) => {
  res.json({
    message: `welcome to delete Option ${req.params.optionID} of a poll ${req.params.pollID}`,
  });
});

router.post("/:pollID/changeQuestion", (req, res) => {
  res.json({
    message: `welcome to changeQuestion of poll ${req.params.pollID}`,
  });
});
module.exports = router;
