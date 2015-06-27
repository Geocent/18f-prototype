'use strict';

angular.module('ads.main', [])
  .controller('MainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

    $scope.displayResultSections = false;

    $rootScope.$on('updateSearchParameters', function(event, adverseEvents) {
      $scope.displayResultSections = adverseEvents.prescriptions.length > 0;
    });
  }]);
