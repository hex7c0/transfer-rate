# [transfer-rate](https://github.com/hex7c0/transfer-rate)

[![NPM version](https://img.shields.io/npm/v/transfer-rate.svg)](https://www.npmjs.com/package/transfer-rate)
[![Linux Status](https://img.shields.io/travis/hex7c0/transfer-rate.svg?label=linux)](https://travis-ci.org/hex7c0/transfer-rate)
[![Windows Status](https://img.shields.io/appveyor/ci/hex7c0/transfer-rate.svg?label=windows)](https://ci.appveyor.com/project/hex7c0/transfer-rate)
[![Dependency Status](https://img.shields.io/david/hex7c0/transfer-rate.svg)](https://david-dm.org/hex7c0/transfer-rate)
[![Coveralls](https://img.shields.io/coveralls/hex7c0/transfer-rate.svg)](https://coveralls.io/r/hex7c0/transfer-rate)

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

### rate(req, start) // calculator

#### req

 - `req` - **Object** Client request object *(default "required")*

#### start

 - `start` - **Array** High precision time, from `process.hrtime()` *(default "required")*

## Examples

Take a look at my [examples](examples)

For chunked data, wait for a fix with event emitter https://github.com/hex7c0/transfer-rate/tree/master/examples/chunk.js

### [License GPLv3](LICENSE)
