'use strict';

angular.module('ads.navbar', ['ui.bootstrap.collapse'])
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.date = new Date();
    $scope.nav = {
        'search': '#/search',
        'about': '#/about',
        'contact': '#/contact',
        'source': 'https://github.com/Geocent/18f-prototype'
    };
    $scope.isActive = function (viewLocation) {
        return viewLocation === '#' + $location.path();
    };
  });
