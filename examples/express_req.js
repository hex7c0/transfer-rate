'use strict';
/**
 * @file express with request example
 * @module transfer-rate
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var transfer = require('..'); // use require('transfer-rate') instead
var app = require('express')();
var finished = require('on-finished');

// customization
var rate = transfer({
  response: false
});

// routing
app.get('/', function(req, res) {

  var start = process.hrtime();

  res.send('ok');
  rate(req, res, start);

  finished(req, function(err) {

    if (!err) {
      console.log(req.transferRate); // show transferRate to console
    }
  });
}).listen(3000);
console.log('starting "hello world" on port 3000');
