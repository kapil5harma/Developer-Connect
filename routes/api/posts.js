const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');

// Post validation
const validatePostInput = require('../../validation/post');

// @route    GET api/posts/test
// @desc     Tests posts route
// @access   Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Posts API Works'
  })
);

// @route    POST api/posts
// @desc     Create posts
// @access   Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.body.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
