const User = require("../models/user");

const create = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;

  let user = await User.findOne({ email: email });
  if (user) {
    console.log("User already exists, id:", user._id.toString());
    res.status(201).json({ message: "OK" });
  } else {
    const user = new User({ email, name, imageUrl });
    user
      .save()
      .then((user) => {
        console.log("User created, id:", user._id.toString());
        res.status(201).json({ message: "OK" });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: "Something went wrong" });
      });
  }
};

const getUsersForLeaderboard = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users: users });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

const addToUserScore = async (req, res) => {
  const email = req.body.email;
  const score = req.body.score;

  const user = await User.findOne({ email: email });
  if (user) {
    console.log("old score: " + user.score)
    //const newScore = user.score + score;
    user.score += score;
    //console.log("new score: " + newScore)
    //if (newScore > user.score) {
      console.log("updating score")
      try {
      User.findOneAndUpdate({ email: email }, user)
      const newUser = await User.findOne({ email: email })
      console.log("new score: " + newUser.score);
      } catch (error) {
        console.log(error);
      }
    //   .then(() => {
           console.log("score after update: " + user.score);
    //   })
    // }
    res.status(200).json({ message: "Score updated" })
  } else {
    res.status(400).json({ message: "User not found" });
  }
}

const UsersController = {
  create: create,
  getUsersForLeaderboard: getUsersForLeaderboard,
  addToUserScore: addToUserScore,
};

module.exports = UsersController;
