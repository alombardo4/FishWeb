'use strict';

angular.module('fishWebApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, hardwareService) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.init = function() {
      hardwareService.getHardware().then(function(result) {
        $scope.hardware = result.data;
        if ($scope.hardware) {
          $scope.editHardware = true;
        }
      });
    };

    $scope.saveHardware = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        if ($scope.editHardware) {
          hardwareService.updateHardware($scope.hardware).then(function() {
            //show success
            $scope.savedHardware = true;
          });
        } else {
          hardwareService.createHardware($scope.hardware).then(function() {
            //show success
            $scope.savedHardware = true;

          });
        }
      }
    };

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
