'use strict';

angular.module('ads.navbar', [])
  .controller('NavbarCtrl', function ($scope) {
    $scope.date = new Date();
    $scope.nav = {
        'home': "#/",
        'about': "#/about",
        'contact': '#/contact',
        'source': 'https://github.com/Geocent/18f-prototype'
    }
  });

