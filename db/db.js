const pgp = require('pg-promise')()

const connection = process.env.NODE_ENV === 'test'
  ? 'postgres:///photos_test'
  : 'postgres:///photos'

const db = pgp(connection)

const vote = (id, direction, amount) =>
  db.oneOrNone('SELECT photo_id, upvotes, downvotes FROM votes WHERE photo_id = $1', id)
    .then((results) => {
      if(!results){
        // insert new record with either 1 upvote or one downvote
        return db.one(`INSERT INTO votes(photo_id, ${direction}) VALUES($1, $2) RETURNING upvotes, downvotes`, [id, 1])
        .then((newresults1) => {
          console.log('1', newresults1);
          return newresults1;
        });
      } else {
        let newCount = results[direction] + amount;
        console.log(typeof amount, typeof results[direction]);
        return db.oneOrNone(`UPDATE votes SET ${direction}=$1 WHERE photo_id=$2 RETURNING upvotes, downvotes`, [newCount, id])
        .then((newresults2) => {
          console.log('2', newresults2);
          return newresults2;
        })
        .catch(err => Object({ success: false, message: err.message }))
      }
    })
    .catch(err => Object({ success: false, message: err.message }))

module.exports = {
  db,
  vote,
}
