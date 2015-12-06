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
      $scope.updateColor = true;
      var values = $scope.lighting.color.split('(')[1];
      values = values.split(')')[0];
      var parts = values.split(',');
      $scope.lighting.r = parseInt(parts[0]);
      $scope.lighting.g = parseInt(parts[1]);
      $scope.lighting.b = parseInt(parts[2]);
      var lighting = $scope.lighting;
      lighting.mode = 0;
      console.log(lighting);
      updateLighting(lighting);
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

    $scope.$watch('lighting.color', function() {
      if ($scope.updateColor === true) {
        $scope.setDirect();
        $scope.updateColor = false;
        $timeout(function() {
            $scope.updateColor = true;
        }, 250);
      }

    });


    $scope.setBrightness = function(value) {
      console.log(value);
      $scope.lighting.brightness = Math.round(value);
      $scope.setDirect();
    };

    function updateLighting(lighting) {
      lightingService.sendLighting(lighting).then(function(result) {
        console.log(result.data);
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
