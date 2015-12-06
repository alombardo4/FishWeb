'use strict';

var app = require('../..');
var request = require('supertest');

describe('Lighting API:', function() {

  describe('GET /api/lightings', function() {
    var lightings;

    beforeEach(function(done) {
      request(app)
        .get('/api/lightings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          lightings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      lightings.should.be.instanceOf(Array);
    });

  });

});
