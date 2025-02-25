const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

module.exports = router;