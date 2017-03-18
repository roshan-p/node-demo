var express = require('express')
var app = express()
app.listen(2000)
var mysql = require('mysql');
var db = {
  host:'128.199.119.79',
  user:'imarket',
  password:'p@ssword',
  database:'imarket'
}
var pool = mysql.createPool(db)

app.engine('html', require('ejs').renderFile)
app.get('/', showHome)
app.get('/list', showList);
app.get('/status', showStatus)
app.use( express.static('public') )
app.use( showError )

function showStatus(req, res) {
  res.send({status:'OK'})
}

function showHome(req, res) {
  res.render('index.html')
}

function showError(req, res) {
  res.render('error.html')
}

function showList(req, res) {
  pool.query('select * from post',
    function (error, data) {
      res.render('list.html', {post: data})
    }
  )
}