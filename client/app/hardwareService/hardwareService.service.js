'use strict';

angular.module('fishWebApp')
  .service('hardwareService', function ($http) {
    var service = {};

    service.getHardware = function() {
      return $http.get('/api/hardwares');
    };

    service.createHardware = function(hardware) {
      return $http.post('/api/hardwares', hardware);
    };

    service.updateHardware = function(hardware) {
      return $http.put('/api/hardwares', hardware);
    };

    return service;
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
