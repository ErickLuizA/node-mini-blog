const routes = require("express").Router()

const db = require('../db')
const blogController = require('./controllers/blogController')
const renderController = require('./controllers/renderController')

routes.get('/', renderController.redirect)

routes.get('/blogs', blogController.index)

routes.get('/blogs/:id', blogController.show)

routes.post("/blogs", blogController.create)

routes.delete('/blogs/:id', blogController.destroy)

routes.get("/about", renderController.about)

routes.get("/create/blog", renderController.createBlog)

routes.use(renderController.error)

module.exports = routes