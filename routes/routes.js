const express = require('express');
const { db, vote } = require('../db/db.js')

const router = express.Router();

// GET home page - layout.pug
router.get('/', (req, res) => {
  res.render('layout');
});

// PUT votes into database
router.put('/votes', (req, res) => {
  console.log(req.body.id, req.body.direction, req.body.amount);
  vote(req.body.id, req.body.direction, req.body.amount)
    .then((results) => {
      console.log('here', results);
      res.json(results)
    })
    .catch(console.error)
})

module.exports = router;
