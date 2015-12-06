'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var feedingCtrlStub = {
  index: 'feedingCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var feedingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './feeding.controller': feedingCtrlStub
});

describe('Feeding API Router:', function() {

  it('should return an express router instance', function() {
    feedingIndex.should.equal(routerStub);
  });

  describe('GET /api/feedings', function() {

    it('should route to feeding.controller.index', function() {
      routerStub.get
        .withArgs('/', 'feedingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
