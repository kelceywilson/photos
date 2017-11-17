const pgp = require('pg-promise')()

const connection = process.env.NODE_ENV === 'test'
  ? 'postgres:///photos_test'
  : 'postgres:///photos'

const db = pgp(connection)

module.exports = {
  db
}
