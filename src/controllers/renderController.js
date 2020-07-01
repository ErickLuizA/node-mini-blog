module.exports = {
  redirect: (req, res) => {
    res.redirect('/blogs')
  },

  about: (req, res) => {
    res.render("about", { title: 'About' })
  },

  createBlog: (req, res) => {
    res.render("create", { title: 'Create blog' })
  },

  error: (req, res) => {
    res.status(404).render("error", { title: '404' })
  }
}