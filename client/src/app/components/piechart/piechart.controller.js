'use strict';

angular.module('ads.piechart',['nvd3'])
  .controller('PieChartCtrl', function($scope, $rootScope){

    loadCharts();

    $rootScope.$on( 'updateSearchParameters', function(event, adverseEvents) {
      loadCharts()
    });

    function loadCharts() {
      setSexChartOptions();
      loadSexChartData();

      setAgeChartOptions();
      loadAgeChartData();
    }

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
      //var width = $('#piechart-sex-div').innerWidth();

      $scope.options = {
        chart: {
          type: 'pieChart',
          height: 500,
          //width: width,
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
      $scope.ageOptions = {
        chart: {
          type: 'pieChart',
          height: 500,
          //width: width,
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

    function loadSexChartData(chartData) {
      $scope.chartData = [
        {
          key: "Male",
          y:.39
        },
        {
          key: "Female",
          y:.61
        }
      ];
    }

    function loadAgeChartData() {
      $scope.ageChartData = [
        {
          key: "< 25",
          y:124
        },
        {
          key: "25-50",
          y:162
        },
        {
          key: "50-75",
          y:111
        },
        {
          key: "Over 75",
          y:35
        }
      ];
    }
  });
