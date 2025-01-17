const express = require("express");
const { getUserData } = require("../controllers/user.controller");

const router = express.Router();

router.get("/profile/:userId", getUserData);

module.exports = router;
