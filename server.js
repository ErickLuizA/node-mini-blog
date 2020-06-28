const express = require('express')

const app = express()

const db = require('./db')

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("views", "src/views")
app.set("view engine", "ejs")

app.use(require('./src/routes'))

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server is running at ${process.env.PORT || 3333}`)
})