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
      lightingService.getLighting().then(function(result) {
        $scope.currentMode = result.data.lightingStatus;
        var rgbString = result.data.lightingRGB;
        var rgbParts = rgbString.split(' ');
        $scope.lighting.r = parseInt(rgbParts[0]);
        $scope.lighting.g = parseInt(rgbParts[1]);
        $scope.lighting.b = parseInt(rgbParts[2]);
        $scope.lighting.brightness = parseInt(rgbParts[3]);
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
        $scope.currentMode = result.data.lightingStatus;
      });
    }



  });
