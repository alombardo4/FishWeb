'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var hardwareCtrlStub = {
  index: 'hardwareCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var hardwareIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './hardware.controller': hardwareCtrlStub
});

describe('Hardware API Router:', function() {

  it('should return an express router instance', function() {
    hardwareIndex.should.equal(routerStub);
  });

  describe('GET /api/hardwares', function() {

    it('should route to hardware.controller.index', function() {
      routerStub.get
        .withArgs('/', 'hardwareCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
