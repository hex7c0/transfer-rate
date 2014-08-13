"use strict";
/**
 * @file chunk example
 * @module transfer-rate
 * @package transfer-rate
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var transfer = require('../index.min.js'); // use require('transfer-rate')
    var app = require('express')();
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

// customization
var rate = transfer();

// routing
app.get('/', function(req, res) {

    var start = process.hrtime();
    rate(req, start);
    res.sendFile(require('path').resolve('a.pdf'));
    req.socket.once('finish', function() {

        if (req.transferRate) {
            console.log(req.transferRate);
        }
        return;
    });
    return;
});
// server starting
app.listen(3000);
console.log('starting "hello world" on port 3000');
