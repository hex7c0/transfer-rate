'use strict';
/**
 * @file basic test
 * @module transfer-rate
 * @subpackage test
 * @version 0.0.1
 * @author https://github.com/expressjs/serve-static
 * @license GPLv3
 */

/*
 * initialize module
 */
var transfer = require('..');
var express = require('express');
var request = require('supertest');
var assert = require('assert');
var finished = require('on-finished');

/*
 * test module
 */
describe('chunk', function() {

  it('should return standard KB/s', function(done) {

    var app = express();
    var rate = transfer();
    app.get('/', function(req, res) {

      var start = process.hrtime();
      rate(req, res, start);

      res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
      finished(res, function(err) {

        if (!err) {
          assert.ok(/^[0-9]*.[0-9]{0,2} KB\/s$/.test(req.transferRate));
          done();
        }
      });
    });
    request(app).get('/').expect(200).end(function(err, res) {

      assert.ifError(err);
    });
  });
  it('should return only ratio', function(done) {

    var app = express();
    var rate = transfer({
      output: false
    });
    app.get('/', function(req, res) {

      var start = process.hrtime();
      rate(req, res, start);

      res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
      finished(res, function(err) {

        if (!err) {
          assert.ok(/^[0-9]*.[0-9]{0,2}$/.test(rate(req, res, start)));
          done();
        }
      });
    });
    request(app).get('/').expect(200).end(function(err, res) {

      assert.ifError(err);
    });
  });

  describe('response', function() {

    describe('second', function() {

      it('should return Byte', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Byte',
          time: 'second'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ Byte\/s/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return KB', function(done) {

        var app = express();
        var rate = transfer({
          data: 'KB',
          time: 'second'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ KB\/s/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return MB', function(done) {

        var app = express();
        var rate = transfer({
          data: 'MB',
          time: 'second'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ MB\/s/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return bit', function(done) {

        var app = express();
        var rate = transfer({
          data: 'bit',
          time: 'second'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ bit\/s/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return Kb', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Kb',
          time: 'second'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ Kbit\/s/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return Mb', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Mb',
          time: 'second'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ Mbit\/s/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
    });

    describe('millisecond', function() {

      it('should return Byte', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Byte',
          time: 'millisecond'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ Byte\/ms/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return KB', function(done) {

        var app = express();
        var rate = transfer({
          data: 'KB',
          time: 'millisecond'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ KB\/ms/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return MB', function(done) {

        var app = express();
        var rate = transfer({
          data: 'MB',
          time: 'millisecond'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ MB\/ms/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return bit', function(done) {

        var app = express();
        var rate = transfer({
          data: 'bit',
          time: 'millisecond'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ bit\/ms/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return Kb', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Kb',
          time: 'millisecond'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ Kbit\/ms/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return Mb', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Mb',
          time: 'millisecond'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ Mbit\/ms/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
    });

    describe('nanosecond', function() {

      it('should return Byte', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Byte',
          time: 'nanosecond'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ Byte\/ns/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return KB', function(done) {

        var app = express();
        var rate = transfer({
          data: 'KB',
          time: 'nanosecond'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ KB\/ns/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return MB', function(done) {

        var app = express();
        var rate = transfer({
          data: 'MB',
          time: 'nanosecond'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ MB\/ns/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return bit', function(done) {

        var app = express();
        var rate = transfer({
          data: 'bit',
          time: 'nanosecond'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ bit\/ns/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return Kb', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Kb',
          time: 'nanosecond'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ Kbit\/ns/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return Mb', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Mb',
          time: 'nanosecond'
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(res, function(err) {

            if (!err) {
              assert.ok(/ Mbit\/ns/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
    });
  });

  describe('request', function() {

    describe('second', function() {

      it('should return Byte', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Byte',
          time: 'second',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ Byte\/s/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return KB', function(done) {

        var app = express();
        var rate = transfer({
          data: 'KB',
          time: 'second',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ KB\/s/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return MB', function(done) {

        var app = express();
        var rate = transfer({
          data: 'MB',
          time: 'second',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ MB\/s/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return bit', function(done) {

        var app = express();
        var rate = transfer({
          data: 'bit',
          time: 'second',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ bit\/s/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return Kb', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Kb',
          time: 'second',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ Kbit\/s/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return Mb', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Mb',
          time: 'second',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ Mbit\/s/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
    });

    describe('millisecond', function() {

      it('should return Byte', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Byte',
          time: 'millisecond',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ Byte\/ms/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return KB', function(done) {

        var app = express();
        var rate = transfer({
          data: 'KB',
          time: 'millisecond',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ KB\/ms/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return MB', function(done) {

        var app = express();
        var rate = transfer({
          data: 'MB',
          time: 'millisecond',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ MB\/ms/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return bit', function(done) {

        var app = express();
        var rate = transfer({
          data: 'bit',
          time: 'millisecond',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ bit\/ms/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return Kb', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Kb',
          time: 'millisecond',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ Kbit\/ms/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return Mb', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Mb',
          time: 'millisecond',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ Mbit\/ms/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
    });

    describe('nanosecond', function() {

      it('should return Byte', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Byte',
          time: 'nanosecond',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ Byte\/ns/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return KB', function(done) {

        var app = express();
        var rate = transfer({
          data: 'KB',
          time: 'nanosecond',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ KB\/ns/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return MB', function(done) {

        var app = express();
        var rate = transfer({
          data: 'MB',
          time: 'nanosecond',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ MB\/ns/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return bit', function(done) {

        var app = express();
        var rate = transfer({
          data: 'bit',
          time: 'nanosecond',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ bit\/ns/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return Kb', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Kb',
          time: 'nanosecond',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ Kbit\/ns/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
      it('should return Mb', function(done) {

        var app = express();
        var rate = transfer({
          data: 'Mb',
          time: 'nanosecond',
          response: false
        });
        app.get('/', function(req, res) {

          var start = process.hrtime();
          rate(req, res, start);

          res.sendFile(require('path').resolve('examples/2.jpg')); // "a.jpg" is a 2Mb file
          finished(req, function(err) {

            if (!err) {
              assert.ok(/ Mbit\/ns/.test(rate(req, res, start)));
              done();
            }
          });
        });
        request(app).get('/').expect(200).end(function(err, res) {

          assert.ifError(err);
        });
      });
    });
  });
});
