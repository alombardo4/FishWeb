'use strict';

angular.module('fishWebApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $mdMedia) {
    $scope.menu = [];
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.$watch(function() { return $mdMedia('md'); }, function(big) {
      $scope.bigScreen = big;
    });

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
