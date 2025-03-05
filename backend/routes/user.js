const express = require('express');
const { registerUser, loginUser } = require('../controller/user');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;

router.get("/login", (req, res) => {
    res.send("Login route is working, but use POST in Postman!");
});