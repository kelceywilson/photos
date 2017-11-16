const pgp = require('pg-promise')()

const connection = process.env.NODE_ENV === 'test'
  ? 'postgres:///photos_test'
  : 'postgres:///photos'

const db = pgp(connection)

const getVotes = (id) => {
  // get votes of current photo
  return db.any('SELECT upVotes, downVotes FROM votes WHERE photo_id=$1', id)
  // return id
}
const upVote = () => {
  // maybe get the current count first, then add 1 then send to update query
  // db.oneOrNone('UPDATE photos SET count=$1 WHERE photo_id=$2 RETURNING photo_id', [newName, petId])
  //   .then((returnedId) => {
  //     if (returnedId) return { success: true, message: 'Name changed!' }
  //     return { success: false, message: `Could not find petId ${petId}` }
  //   })
  //   .catch(err => Object({ success: false, message: err.message }))
}

const downVote = () => {

}

module.exports = {
  db,
  getVotes,
  upVote,
  downVote,
}
