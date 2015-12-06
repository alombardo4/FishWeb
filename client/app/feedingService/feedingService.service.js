'use strict';

angular.module('fishWebApp')
  .service('feedingService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var service = {};

    service.getFeedings = function() {
      return $http.get('/api/feedings');
    };

    service.createFeeding = function() {
      return $http.post('/api/feedings');
    };


    return service;
  });
