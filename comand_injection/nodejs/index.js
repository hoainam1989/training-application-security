/**
 * Hd7exploit
 * hd7exploit.wordpress.com/
 */
const express = require('express')
const app = express()
const exec = require('child_process').exec;
const path_module = './../independent_module';
var serialize = require('node-serialize');

/**
 * unserialize
 */
app.get('/exploit/unserialize/:data', function (req, res) {
  var data = req.params.data;
  unserialize_obj = serialize.unserialize(data)
  res.status(200).send(unserialize_obj) 
});

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})