const passport = require('passport');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/');

const router = express.Router();
const { SECRET } = process.env;

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Express RESTful API');
});

/* Create new user endpoint */
router.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'Please pass username and password.' });
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      role: 'NotValidated',
    });
    // save the user
    newUser.save((err) => {
      if (err) {
        return res.json({ success: false, msg: 'Username already exists.' });
      }
      return res.json({ success: true, msg: 'Successful created new user.' });
    });
  }
});

/* Login endpoint */
router.post('/signin', (req, res) => {
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, (errCompare, isMatch) => {
        if (isMatch && !errCompare) {
          // if user is found and password is right create a token
          const token = jwt.sign({ user: user.username, role: user.role }, SECRET);
          // return the information including token as JSON
          res.json({ success: true, token: `JWT ${token}` });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
});

module.exports = router;
