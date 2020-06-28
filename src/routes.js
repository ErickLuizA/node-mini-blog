const routes = require("express").Router()

const db = require('../db')

routes.get('/', (req, res) => {
  res.redirect('/blogs')
})

routes.get('/blogs', (req, res) => {
  db.all(`SELECT * FROM blogs`, (err, rows) => {
    if(err) {
      console.log(err)
      return res.send("Error at the database")
    } 

    const blogs = [...rows]
    
    res.render("index", { title: 'All blogs', blogs })
  })
})

routes.get('/blogs/:id', (req, res) => {
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
})

routes.post("/blogs", (req, res) => {
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
})

routes.delete('/blogs/:id', (req, res) => {
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
})

routes.get("/about", (req, res) => {
  res.render("about", { title: 'About' })
})

routes.get("/create/blog", (req, res) => {
  res.render("create", { title: 'Create blog' })
})

routes.use((req, res) => {
  res.status(404).render("error", { title: '404' })
})

module.exports = routes