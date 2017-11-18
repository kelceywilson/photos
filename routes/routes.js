const express = require('express');
const { db, vote } = require('../db/db.js')

const router = express.Router();

// GET home page - main.pug
router.get('/', (req, res) => {
  res.render('layout');
});

// update upVote count -- need to update downVote
router.put('/votes', (req, res) => {
  console.log(req.body.id);
  // vote(req.body.id, req.body.direction)
  //   .then((results) => {
  //     console.log('here', results);
  //     res.json(results)
  //   })
  //   .catch(console.error)

  db.oneOrNone('SELECT photo_id, upvotes, downvotes FROM votes WHERE photo_id = $1', req.body.id)
    .then((results) => {
      if(!results){
        // insert new record with either 1 upvote or one downvote
        db.one(`INSERT INTO votes(photo_id, ${req.body.direction}) VALUES($1, $2) RETURNING upvotes, downvotes`, [req.body.id, 1])
          .then((newresults1) => {
            res.json(newresults1);
          });
      } else {
        let newCount = results[req.body.direction] + 1;
        db.oneOrNone(`UPDATE votes SET ${req.body.direction}=$1 WHERE photo_id=$2 RETURNING upvotes, downvotes`, [newCount, req.body.id])
          .then((newresults2) => {
            res.json(newresults2);
          })
          .catch(err => Object({ success: false, message: err.message }))
      }
    })
    .catch(err => Object({ success: false, message: err.message }))
})

module.exports = router;
