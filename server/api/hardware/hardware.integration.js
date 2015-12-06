'use strict';

var app = require('../..');
var request = require('supertest');

describe('Hardware API:', function() {

  describe('GET /api/hardwares', function() {
    var hardwares;

    beforeEach(function(done) {
      request(app)
        .get('/api/hardwares')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          hardwares = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      hardwares.should.be.instanceOf(Array);
    });

  });

});
