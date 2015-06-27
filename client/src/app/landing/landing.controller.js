'use strict';

angular.module('ads.landing', ['ui.bootstrap'])
  .controller('LandingCtrl', ['$http', '$location', '$scope', function ($http, $location, $scope) {
      $scope.drug = '';
      $scope.brandNames = [];

      $scope.validatePrescription = function() {
        if(_.isEmpty($scope.drug)) {
            $scope.drug = '';
        }
      };

      $scope.searchDrug = function() {
          $location.url('/search?drugname=' + $scope.drug);
      };

      $http
        .get('/assets/brand_names.json')
        .success(function(data){
            $scope.brandNames = data.map(function(value){
                return value.name;
            });
        })
        .error(function(err){
            console.error(err);
        });
    }]);
