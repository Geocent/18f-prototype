'use strict';

angular.module('ads.searchfield', [])
  .controller('SearchfieldCtrl', ['$http', '$rootScope', '$scope', function ($http, $rootScope, $scope) {
      $scope.prescriptions = [
          {value: ''}
      ];

      $scope.brandNames = [];

      $scope.$watch('prescriptions', function() {
          if(!_.isEmpty($scope.prescriptions[$scope.prescriptions.length - 1].value)) {
              $scope.prescriptions.push({value: ''});
          }
      }, true);

      $scope.updateSearchParameters = function() {
          var selected = $scope.prescriptions.filter(function(prescription) {
             return !_.isEmpty(prescription.value);
          });

        $rootScope.$broadcast('updateSearchParameters', {
            'prescriptions': selected.map(function(prescription) {
                return prescription.value;
            })
        });
      };

      $scope.removePrescription = function(index) {
          $scope.prescriptions.splice(index, 1);

          $scope.updateSearchParameters();
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
