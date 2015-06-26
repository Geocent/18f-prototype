'use strict';

angular.module('ads.searchfield', ['nya.bootstrap.select'])
  .controller('SearchfieldCtrl', ['$http', '$rootScope', '$scope', function ($http, $rootScope, $scope) {
      $scope.prescriptions = [
          {value: undefined}
      ];

      $scope.brandNames = [];

      $scope.serious = false;

      $scope.$watch('prescriptions', function() {
          if(!_.isEmpty($scope.prescriptions[$scope.prescriptions.length - 1].value)) {
              $scope.prescriptions.push({value: undefined});
          }

          $scope.updateSearchParameters();
      }, true);

      $scope.updateSearchParameters = function() {
          var selected = $scope.prescriptions.filter(function(prescription) {
             return !_.isEmpty(prescription.value);
          });

          if(selected.length > 0) {
            $rootScope.$broadcast('updateSearchParameters', {
                'serious': $scope.serious === true,
                'prescriptions': selected.map(function(prescription) {
                    return prescription.value;
                })
            });
          }
      };

      $scope.removePrescription = function(index) {
          $scope.prescriptions.splice(index, 1);

        //   $scope.updateSearchParameters();
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
