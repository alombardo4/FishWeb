'use strict';

describe('Controller: LightingCtrl', function () {

  // load the controller's module
  beforeEach(module('fishWebApp'));

  var LightingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LightingCtrl = $controller('LightingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
