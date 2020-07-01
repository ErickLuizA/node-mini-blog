const db = require('../../db')

module.exports = {
  index: (req, res) => {
    db.all(`SELECT * FROM blogs`, (err, rows) => {
      if(err) {
        console.log(err)
        return res.send("Error at the database")
      } 
  
      const blogs = [...rows]
      
      res.render("index", { title: 'All blogs', blogs })
    })
  },

  show: (req, res) => {
    const { id } = req.params
  
    db.all(`
      SELECT * FROM blogs WHERE Id = ${id}
      `, (err, rows) => {
        if(err) {
          console.log(err)
          return res.send("Error at the database")
        }
        const blog = [...rows]    
  
        res.render("blog", { title: blog[0].title, blog: blog[0] })
      })
  },

  create: (req, res) => {
    const values = [
      req.body.title,
      req.body.snippet,
      req.body.body
    ]
    const query = `
      INSERT INTO blogs (
        title,
        snippet,
        body
      ) VALUES (?,?,?)
    `
    db.run(query, values, err => {
      if(err) {
        console.log(err)
        return res.send('Error at the database')
      }
  
      return res.redirect("/blogs")
    })
  },

  destroy: (req, res) => {
    const { id } = req.params
  
    db.all(`
      DELETE FROM blogs
      WHERE Id = ${id}
    `, err => {
      if(err) {
        console.log(err)
        return res.send('Error at the database')
      }
  
      res.json({ redirect: '/blogs' })
    })
  }
}