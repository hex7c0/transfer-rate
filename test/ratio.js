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

/*
 * test module
 */
describe('ratio', function() {

  it('should return standard KB/s', function(done) {

    var app = express();
    var rate = transfer();
    app.get('/', function(req, res) {

      var start = process.hrtime();
      res.send('ok');
      assert.ok(/^[0-9]*.[0-9]? KB\/s$/.test(rate(req, start)));
      done();
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
      res.send('ok');
      assert.ok(/^[0-9]*.[0-9]?$/.test(rate(req, start)));
      done();
    });
    request(app).get('/').expect(200).end(function(err, res) {

      assert.ifError(err);
    });
  });

  describe('response', function() {

    it('should return Byte', function(done) {

      var app = express();
      var rate = transfer({
        data: 'Byte'
      });
      app.get('/', function(req, res) {

        var start = process.hrtime();
        res.send('ok');
        assert.ok(/ Byte/.test(rate(req, start)));
        done();
      });
      request(app).get('/').expect(200).end(function(err, res) {

        assert.ifError(err);
      });
    });
    it('should return MB', function(done) {

      var app = express();
      var rate = transfer({
        data: 'MB'
      });
      app.get('/', function(req, res) {

        var start = process.hrtime();
        res.send('ok');
        assert.ok(/ MB/.test(rate(req, start)));
        done();
      });
      request(app).get('/').expect(200).end(function(err, res) {

        assert.ifError(err);
      });
    });
    it('should return bit', function(done) {

      var app = express();
      var rate = transfer({
        data: 'bit'
      });
      app.get('/', function(req, res) {

        var start = process.hrtime();
        res.send('ok');
        assert.ok(/ bit/.test(rate(req, start)));
        done();
      });
      request(app).get('/').expect(200).end(function(err, res) {

        assert.ifError(err);
      });
    });
    it('should return Kb', function(done) {

      var app = express();
      var rate = transfer({
        data: 'Kb'
      });
      app.get('/', function(req, res) {

        var start = process.hrtime();
        res.send('ok');
        assert.ok(/ Kb/.test(rate(req, start)));
        done();
      });
      request(app).get('/').expect(200).end(function(err, res) {

        assert.ifError(err);
      });
    });
    it('should return Mb', function(done) {

      var app = express();
      var rate = transfer({
        data: 'Mb'
      });
      app.get('/', function(req, res) {

        var start = process.hrtime();
        res.send('ok');
        assert.ok(/ Mb/.test(rate(req, start)));
        done();
      });
      request(app).get('/').expect(200).end(function(err, res) {

        assert.ifError(err);
      });
    });
    it('should return nanosecond', function(done) {

      var app = express();
      var rate = transfer({
        time: 'nanosecond'
      });
      app.get('/', function(req, res) {

        var start = process.hrtime();
        res.send('ok');
        assert.ok(/\/ns/.test(rate(req, start)));
        done();
      });
      request(app).get('/').expect(200).end(function(err, res) {

        assert.ifError(err);
      });
    });
    it('should return millisecond', function(done) {

      var app = express();
      var rate = transfer({
        time: 'millisecond'
      });
      app.get('/', function(req, res) {

        var start = process.hrtime();
        res.send('ok');
        assert.ok(/\/ms/.test(rate(req, start)));
        done();
      });
      request(app).get('/').expect(200).end(function(err, res) {

        assert.ifError(err);
      });
    });
  });

  describe('request', function() {

    it('should return Byte', function(done) {

      var app = express();
      var rate = transfer({
        data: 'Byte',
        response: false
      });
      app.get('/', function(req, res) {

        var start = process.hrtime();
        res.send('ok');
        assert.ok(/ Byte/.test(rate(req, start)));
        done();
      });
      request(app).get('/').expect(200).end(function(err, res) {

        assert.ifError(err);
      });
    });
    it('should return MB', function(done) {

      var app = express();
      var rate = transfer({
        data: 'MB',
        response: false
      });
      app.get('/', function(req, res) {

        var start = process.hrtime();
        res.send('ok');
        assert.ok(/ MB/.test(rate(req, start)));
        done();
      });
      request(app).get('/').expect(200).end(function(err, res) {

        assert.ifError(err);
      });
    });
    it('should return bit', function(done) {

      var app = express();
      var rate = transfer({
        data: 'bit',
        response: false
      });
      app.get('/', function(req, res) {

        var start = process.hrtime();
        res.send('ok');
        assert.ok(/ bit/.test(rate(req, start)));
        done();
      });
      request(app).get('/').expect(200).end(function(err, res) {

        assert.ifError(err);
      });
    });
    it('should return Kb', function(done) {

      var app = express();
      var rate = transfer({
        data: 'Kb',
        response: false
      });
      app.get('/', function(req, res) {

        var start = process.hrtime();
        res.send('ok');
        assert.ok(/ Kb/.test(rate(req, start)));
        done();
      });
      request(app).get('/').expect(200).end(function(err, res) {

        assert.ifError(err);
      });
    });
    it('should return Mb', function(done) {

      var app = express();
      var rate = transfer({
        data: 'Mb',
        response: false
      });
      app.get('/', function(req, res) {

        var start = process.hrtime();
        res.send('ok');
        assert.ok(/ Mb/.test(rate(req, start)));
        done();
      });
      request(app).get('/').expect(200).end(function(err, res) {

        assert.ifError(err);
      });
    });
    it('should return nanosecond', function(done) {

      var app = express();
      var rate = transfer({
        time: 'nanosecond',
        response: false
      });
      app.get('/', function(req, res) {

        var start = process.hrtime();
        res.send('ok');
        assert.ok(/\/ns/.test(rate(req, start)));
        done();
      });
      request(app).get('/').expect(200).end(function(err, res) {

        assert.ifError(err);
      });
    });
    it('should return millisecond', function(done) {

      var app = express();
      var rate = transfer({
        time: 'millisecond',
        response: false
      });
      app.get('/', function(req, res) {

        var start = process.hrtime();
        res.send('ok');
        assert.ok(/\/ms/.test(rate(req, start)));
        done();
      });
      request(app).get('/').expect(200).end(function(err, res) {

        assert.ifError(err);
      });
    });
  });
});
