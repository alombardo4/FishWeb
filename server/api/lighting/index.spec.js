'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var lightingCtrlStub = {
  index: 'lightingCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var lightingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './lighting.controller': lightingCtrlStub
});

describe('Lighting API Router:', function() {

  it('should return an express router instance', function() {
    lightingIndex.should.equal(routerStub);
  });

  describe('GET /api/lightings', function() {

    it('should route to lighting.controller.index', function() {
      routerStub.get
        .withArgs('/', 'lightingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
