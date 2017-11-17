const express = require('express');
const { db } = require('../db/db.js')

const router = express.Router();

// GET home page - main.pug
router.get('/', (req, res) => {
  // function to give random number between 0 and 49
  let randomNumber = Math.round(Math.random() * 49)
  // AJAX request to pull the random photo
  res.render('layout', { randomNumber: randomNumber });
});

// update upVote count -- need to update downVote
router.put('/votes', (req, res) => {
  let newCount = 0
  const votes = db.any('SELECT upvotes FROM votes WHERE photo_id=$1', req.body.id)
    .then((returnedCount) => {
      console.log(returnedCount[0].upvotes);
      newCount = returnedCount[0].upvotes + 1
      db.oneOrNone('UPDATE votes SET upvotes=$1 WHERE photo_id=$2 RETURNING upvotes, downvotes', [newCount, req.body.id])
        .then((returnedNewCount) => {
          console.log('newCount', returnedNewCount)
          // console.log(returnedNewCount.isArray());
          res.json(returnedNewCount);
        })
        .catch(err => Object({ success: false, message: err.message }))
    })
})

module.exports = router;
