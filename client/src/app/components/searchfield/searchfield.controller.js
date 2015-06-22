'use strict';

angular.module('ads.searchfield', [])
  .controller('SearchfieldCtrl', ['$http', '$scope', function ($http, $scope) {
      $scope.prescriptions = [
          {value: ''}
      ];

      $scope.brandNames = [];

      $scope.$watch('prescriptions', function() {
          if($scope.prescriptions[$scope.prescriptions.length - 1].value.length > 0) {
              $scope.prescriptions.push({value: ''});
          }
      }, true);

      $scope.removePrescription = function(index) {
          $scope.prescriptions.splice(index, 1);
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
