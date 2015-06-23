'use strict';

angular.module('ads.searchfield', [])
  .controller('SearchfieldCtrl', ['$http', '$rootScope', '$scope', function ($http, $rootScope, $scope) {
      $scope.prescriptions = [
          {value: ''}
      ];

      $scope.brandNames = [];

      $scope.$watch('prescriptions', function() {
          if($scope.prescriptions[$scope.prescriptions.length - 1].value !== undefined && $scope.prescriptions[$scope.prescriptions.length - 1].value.length > 0) {
              $scope.prescriptions.push({value: ''});
          }
      }, true);

      $scope.updateSelected = function() {
          var selected = $scope.prescriptions.filter(function(prescription) {
             return prescription.value !== undefined && prescription.value.length > 0;
          });

        $rootScope.$broadcast('updatePrescriptions', {
            'serious': $scope.serious,
            'prescriptions': selected.map(function(prescription) {
                return prescription.value;
            })
        });
      };

      $scope.updateSeriousness = function() {
          $scope.updateSelected();
      }

      $scope.removePrescription = function(index) {
          $scope.prescriptions.splice(index, 1);

          $scope.updateSelected();
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
