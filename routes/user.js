const express = require('express');
const router = express.Router();
const User = require("../models/user.model")
const UserController = require("../controllers/UserController")

router.post('/register', UserController.createUser);
router.post('/login', UserController.login);

module.exports = router;