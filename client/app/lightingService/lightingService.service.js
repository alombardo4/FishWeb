'use strict';

angular.module('fishWebApp')
  .service('lightingService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var service = {};
    service.sendLighting = function(lighting) {
      return $http.post('/api/lightings/', lighting);
    };
    service.getLighting = function() {
      return $http.get('/api/lightings/');
    };
    return service;
  });
