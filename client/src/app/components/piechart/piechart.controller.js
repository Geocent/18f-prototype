'use strict';

angular.module('ads.piechart',['nvd3','ads.services.openfda'])
  .controller('PieChartCtrl', function($scope, $rootScope, MedicationsSearchService){

    $rootScope.$on( 'updateSearchParameters', function(event, adverseEvents) {
      $scope.adverseEvents = adverseEvents;
      loadSexChartData();
      loadAgeChartData()
    });

    function getDefaultChartOptions() {
      return {
        chart: {
          type: 'pieChart',
          height: 500,
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
      //$scope.options = getDefaultChartOptions();
      var chartWidth = getChartWidth();

      $scope.options = {
        chart: {
          type: 'pieChart',
          height: 500,
          //width: chartWidth,
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

    function setAgeChartOptions() {
      //$scope.ageOptions = getDefaultChartOptions();
      //var width = $('#piechart-age-div').innerWidth();
      var chartWidth = getChartWidth();

      $scope.ageOptions = {
        chart: {
          type: 'pieChart',
          height: 500,
          //width: chartWidth,
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

    function getChartWidth() {
      //var screenWidth = window.screen.width;
      //return Math.round(screenWidth/chartsPerRow);
      var width = $('#piechart-sex-div').innerWidth();
      return width;
    }

    function loadSexChartData() {

      MedicationsSearchService.query($scope.adverseEvents, null, 'patient.patientsex', null, function(data) {
        var i, result, chartEntry;
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

      MedicationsSearchService.query($scope.adverseEvents, 'patient.patientonsetage:[0 TO 24]', 'receivedateformat', null, function(data) {
        var i, result;
        for (i = 0; i < data.results.length; ++i) {
          result = data.results[i];
          $scope.ageChartData.push({
            key: "< 25",
            y: result.count
          });
        }
        // Should only need to set this once
        setAgeChartOptions();
      });

      MedicationsSearchService.query($scope.adverseEvents, 'patient.patientonsetage:[25 TO 50]', 'receivedateformat', null, function(data) {
        var i, result;
        for (i = 0; i < data.results.length; ++i) {
          result = data.results[i];
          $scope.ageChartData.push({
            key: "25-50",
            y: result.count
          });
        }
      });

    }
  });
