const express = require('express');
const { getVotes } = require('../db/db.js')

// const db = require('../db/client.js');
const http = require('http');

const router = express.Router();

// GET home page - main.pug
// include any existing variables
router.get('/', (req, res) => {
  // As a user, I want to see a random image when I go to the '/' route for the site.
  // function to give random number between 0 and 49
  let randomNumber = Math.round(Math.random() * 49)
  // we need to do AJAX request to pull the random photo
  res.render('layout', { randomNumber: randomNumber });
});

router.get('/votes', (req, res) => {

  // console.log('voted');
  // res.json({
  //   response: 'error',
  //   body: error,
  // });
})

module.exports = router;
