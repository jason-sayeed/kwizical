const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.get("/leaderboard", UsersController.getUsersForLeaderboard);
router.post("/leaderboard", UsersController.addToUserScore);

module.exports = router;
