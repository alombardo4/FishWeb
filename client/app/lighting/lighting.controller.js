'use strict';

angular.module('fishWebApp')
  .controller('LightingCtrl', function ($scope, lightingService) {
    $scope.message = 'Hello';

    $scope.sendLighting = function(form) {
      if (form.$valid) {
        lightingService.sendLighting($scope.lighting).then(function(response) {
          console.log(response);
        });
      }
    };
  });
