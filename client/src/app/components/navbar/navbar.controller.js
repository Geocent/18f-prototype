'use strict';

angular.module('ads.navbar', [])
  .controller('NavbarCtrl', function ($scope) {
    $scope.date = new Date();
  });

