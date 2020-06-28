const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./blog.db')

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS blogs(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      snippet TEXT, 
      body TEXT
    )
    `
  )
})

module.exports = db