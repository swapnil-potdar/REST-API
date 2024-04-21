const express = require('express')
const app = express()
const port = 3000

app.set("view engine", "ejs");

app.use(function(req,res,next){
  console.log('middleware working');
  next();
});

/* app.get('/', (req, res) => {
  res.send('Hello World! It works!')
}) */

app.use(express.static("./public"));

app.get('/profile', (req, res) => {
  res.send('Hello from profile!')
})

app.get('/profile/:username', (req, res) => {
  res.send(`Hello from ${req.params.username}`)
})

app.get('/', (req, res) => {
  res.render("index",{name:"swap"})
})

app.get('/contact', (req, res) => {
  res.render("contact")
})

app.get('/error', (req, res) => {
  throw Error("something went wrong");
  /* res.render("error") */
})

app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
