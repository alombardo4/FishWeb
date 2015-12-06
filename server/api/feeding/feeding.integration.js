'use strict';

var app = require('../..');
var request = require('supertest');

describe('Feeding API:', function() {

  describe('GET /api/feedings', function() {
    var feedings;

    beforeEach(function(done) {
      request(app)
        .get('/api/feedings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          feedings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      feedings.should.be.instanceOf(Array);
    });

  });

});
