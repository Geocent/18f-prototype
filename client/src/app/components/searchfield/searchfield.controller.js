'use strict';

angular.module('ads.searchfield', ['ui.bootstrap'])
  .controller('SearchfieldCtrl', ['$http', '$location', '$rootScope', '$scope', '$timeout', function ($http, $location, $rootScope, $scope, $timeout) {

      var queryParameters = $location.search();

      $scope.prescriptions = queryParameters.drugname ?
        [ { value: queryParameters.drugname }, { value: '' } ] :
        [ { value: '' } ];

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
            'serious': $scope.serious === true,
            'prescriptions': selected.map(function(prescription) {
                return prescription.value;
            })
        });
      };

      $scope.removePrescription = function(index) {
          $scope.prescriptions.splice(index, 1);

          $scope.updateSearchParameters();
      };

      $scope.validatePrescription = function(index) {
        if(_.isEmpty($scope.prescriptions[index].value)) {
            $scope.prescriptions[index] = '';
        }
      };

      $scope.validateField = function() {

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

      var selected = $scope.prescriptions.filter(function(prescription) {
         return !_.isEmpty(prescription.value);
      });

      if(selected.length > 0) {
          $timeout(function(){
              $scope.updateSearchParameters();
          });
      }
  }]);
