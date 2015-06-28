'use strict';

angular.module('ads.piechart',['nvd3','ads.services.openfda'])
  .controller('PieChartCtrl', function($scope, $rootScope, MedicationsSearchService){

    $rootScope.$on( 'updateSearchParameters', function(event, adverseEvents) {
      $scope.adverseEvents = adverseEvents;
      loadSexChartData();
      loadAgeChartData();
    });

    function getDefaultChartOptions() {
      return {
        chart: {
          type: 'pieChart',
          height: 300,
          x: function(d){return d.key;},
          y: function(d){return d.y;},
          showLabels: true,
          transitionDuration: 500,
          labelThreshold: 0.01,
          legend: {
            margin: {
              top: 5,
              right: 35,
              bottom: 5,
              left: 0
            }
          }
        }
      };
    }

    function setSexChartOptions() {
      var options = getDefaultChartOptions();
      $scope.options = options;
    }

    function setAgeChartOptions() {
      var options = getDefaultChartOptions();
      $scope.ageOptions = options;
    }

    function loadSexChartData() {

      MedicationsSearchService.query($scope.adverseEvents, null, 'patient.patientsex', null, function(data) {
        var i, result;
        $scope.chartData = [];
        for (i = 0; i < data.results.length; ++i) {
          result = data.results[i];
          $scope.chartData.push({
            key: decodeSexFrom(result.term),
            y: result.count
          });
        }
        setSexChartOptions();
      });
    }

    function decodeSexFrom(term) {
      var sex;
      if (2 === term) {
        sex = 'Male';
      } else if (1 === term) {
        sex = 'Female';
      } else if (0 === term) {
        sex = 'Unknown';
      } else {
        sex = 'Unknown';
      }
      return sex;
    }

    function loadAgeChartData() {

      $scope.ageChartData = [];

      queryAgeService('< 25', '[0 TO 24]', true);
      queryAgeService('25-49', '[25 TO 49]', false);
      queryAgeService('50-74', '[50 TO 74]', false);
      queryAgeService('Over 75', '[75 TO 150]', false);

    }

    function queryAgeService(label, searchRange, setOptions) {
      var searchCriteria = 'AND patient.patientonsetage:' + searchRange;
      MedicationsSearchService.query($scope.adverseEvents, searchCriteria, 'receivedateformat', '20', function(data) {
        var i, result;
        for (i = 0; i < data.results.length; ++i) {
          result = data.results[i];
          $scope.ageChartData.push({
            key: label,
            y: result.count
          });
        }
        if (setOptions) {
          setAgeChartOptions();
        }
      });
    }

  })
  .controller('Top20PieChartCtrl', function($scope, $rootScope, MedicationsSearchService, $controller) {
    $controller('PieChartCtrl', {'$scope': $scope});
  })
  .controller('DetailPieChartCtrl', function($scope, $rootScope, MedicationsSearchService, $controller) {
    $controller('PieChartCtrl', {'$scope': $scope});
  });
