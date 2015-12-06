'use strict';

angular.module('fishWebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lighting', {
        url: '/lighting',
        templateUrl: 'app/lighting/lighting.html',
        controller: 'LightingCtrl'
      });
  });
