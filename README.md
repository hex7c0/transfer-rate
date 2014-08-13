# [transfer-rate](http://supergiovane.tk/#/transfer-rate)

[![NPM version](https://badge.fury.io/js/transfer-rate.svg)](http://badge.fury.io/js/transfer-rate)
[![Build Status](https://travis-ci.org/hex7c0/transfer-rate.svg?branch=master)](https://travis-ci.org/hex7c0/transfer-rate)
[![devDependency Status](https://david-dm.org/hex7c0/transfer-rate/dev-status.svg)](https://david-dm.org/hex7c0/transfer-rate#info=devDependencies)

Calculate transfer-rate of request/response with different option for customization.
Build a function that, calculate ratio between data and time.

## Installation

Install through NPM

```bash
npm install transfer-rate
```
or
```bash
git clone git://github.com/hex7c0/transfer-rate.git
```

## API

inside expressjs project
```js
var transfer = require('transfer-rate');
var app = require('express')();

var rate = transfer();

app.get('/', function(req, res) {
    var start = process.hrtime();
    res.send('ok');
    console.log(transfer(req, start));
});
```

### Methods

Calculation is store inside `req` **Object** and returned from function.
```js
req.transferRate
```

### transfer(options) // builder

#### options

 - `data` **String** Accepted string are related to http://en.wikipedia.org/wiki/Data_rate_units `[Byte, KB, MB, bit, Kb, Mb]` *(default "KB")*
 - `time` - **String** Accepted string for calculate ratio are `[nanosecond, millisecond, second]` *(default "second")*
 - `response` - **Boolean** Flag for calculate transfer rate of response(true) or request(false) *(default "response")*
 - `output` - **Boolean** Flag for display(true) extra information like `KB/s` or only data(false) *(default "display")*

### rate(req,start) // calculator

#### req

 - `req` - **Object** Client request object *(default "required")*

#### start

 - `start` - **Array** High precision time, from `process.hrtime()` *(default "required")*

## Examples

Take a look at my [examples](https://github.com/hex7c0/transfer-rate/tree/master/examples)

For chunked data, wait for a fix with event emitter https://github.com/hex7c0/transfer-rate/tree/master/examples/chunk.js

### [License GPLv3](http://opensource.org/licenses/GPL-3.0)