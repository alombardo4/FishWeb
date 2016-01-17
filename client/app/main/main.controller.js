'use strict';

angular.module('fishWebApp')
  .controller('MainCtrl', function ($scope, lightingService, $timeout, feedingService) {
    $scope.updateColor = false;
    $scope.init = function() {
      $scope.lighting = {};
      $scope.lighting.r = 255;
      $scope.lighting.g = 255;
      $scope.lighting.b = 255;
      $scope.lighting.brightness = 255;
      feedingService.getFeedings().then(function(result) {
        $scope.allFeedings = result.data;
        $scope.lastFeeding = $scope.allFeedings[0];
      });
    };

    $scope.recordFeeding = function() {
      feedingService.createFeeding().then(function() {
        feedingService.getFeedings().then(function(result) {
          $scope.allFeedings = result.data;
          $scope.lastFeeding = $scope.allFeedings[0];
        });
      });
    };

    $scope.setDirect = function() {
      $scope.lighting.mode = 0;
      updateLighting($scope.lighting);
    };

    $scope.setRainbowCycle = function() {
      $scope.updateColor = false;
      var lighting = $scope.lighting;
      lighting.mode = 1;
      updateLighting(lighting);
    };

    $scope.setChill = function() {
      $scope.updateColor = false;
      var lighting = $scope.lighting;
      lighting.mode = 2;
      updateLighting(lighting);
    };

    $scope.setAquatic = function() {
      $scope.updateColor = false;
      var lighting = $scope.lighting;
      lighting.mode = 3;
      updateLighting(lighting);
    };
    $scope.setHell = function() {
      $scope.updateColor = false;
      var lighting = $scope.lighting;
      lighting.mode = 4;
      updateLighting(lighting);
    };
    $scope.setVegas = function() {
      $scope.updateColor = false;
      var lighting = $scope.lighting;
      lighting.mode = 5;
      updateLighting(lighting);
    };
    $scope.setOff = function() {
      $scope.updateColor = false;
      var lighting = $scope.lighting;
      lighting.mode = 6;
      updateLighting(lighting);
    };
    $scope.setStandard = function() {
      $scope.updateColor = false;
      var lighting = $scope.lighting;
      lighting.mode = -1;
      updateLighting(lighting);
    };

    function updateLighting(lighting) {
      lightingService.sendLighting(lighting).then(function(result) {
        $scope.lightingMessage = 'Lighting mode set to ';
        switch(result.data.state) {
          case -1:
            $scope.lightingMessage += 'standard.';
            break;
          case 0:
            $scope.lightingMessage += 'direct.';
            break;
          case 1:
            $scope.lightingMessage += 'rainbow cycle.';
            break;
          case 2:
            $scope.lightingMessage += 'chill.';
            break;
          case 3:
            $scope.lightingMessage += 'aquatic.';
            break;
          case 4:
            $scope.lightingMessage += 'hell.';
            break;
          case 5:
            $scope.lightingMessage += 'Vegas.';
            break;
          case 6:
            $scope.lightingMessage += 'off.';
            break;
        }
      });
    }



  });
