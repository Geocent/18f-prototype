'use strict';

angular.module('ads.piechart',['nvd3','ads.services.openfda'])
  .controller('PieChartCtrl', function($scope, $rootScope, MedicationsSearchService, $attrs){
    var FEMALE = {
      'name': 'Female',
      'color': '#CC6573'
    };
    var MALE = {
      'name': 'Male',
      'color': '#4F92A6'
    };
    var UNKNOWN = {
      'name': 'Unknown',
      'color': '#C8C8C8'
    };

    $rootScope.$on( 'updateSearchParameters', function(event, adverseEvents) {
      $scope.adverseEvents = adverseEvents;
      // Load the top 20 charts when a search for medications is kicked off.
      if (!$attrs.detailSection && adverseEvents.prescriptions.length > 0) {
        loadSexChartData();
        loadAgeChartData();
      }
    });

    $scope.showCharts = false;

    $rootScope.$on( 'symptomChanged', function(event, symptom) {
      $scope.symptomName = symptom.name;
      if ($attrs.detailSection) {
        if ($scope.symptomName) {
          $scope.showCharts = true;
          $scope.adverseEvents = symptom.adverseEvents;
          loadSexChartData();
          loadAgeChartData();
        } else {
          $scope.showCharts = false;
        }
      }
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
          labelType:'percent',
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
      options.chart.color = function(d, i) {
        var color, key;
        if (d.data) {
          key = d.data.key;
        } else {
          key = d.key;
        }
        switch (key) {
          case FEMALE.name:
                color = FEMALE.color;
                break;
          case MALE.name:
                color = MALE.color;
                break;
          case UNKNOWN.name:
                color = UNKNOWN.color;
                break;
          default:
                color = UNKNOWN.color;
        }
        return color;
      };
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
      switch (term) {
        case 2: sex = FEMALE.name;
              break;
        case 1: sex = MALE.name;
              break;
        case 0: sex = UNKNOWN.name;
              break;
        default: sex = UNKNOWN.name;
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
      var searchCriteria = ' AND patient.patientonsetage:' + searchRange;
      if ($attrs.detailSection) {
        searchCriteria = searchCriteria + ' AND patient.reaction.reactionmeddrapt:' + $scope.symptomName;
      }
      MedicationsSearchService.query($scope.adverseEvents, searchCriteria, 'receivedateformat', $attrs.limit, function(data) {
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
  .controller('Top20PieChartCtrl', function($scope, $rootScope, MedicationsSearchService, $controller, $attrs) {
    $attrs.limit = '20';
    $attrs.detailSection = false;
    $controller('PieChartCtrl', {'$scope': $scope, '$attrs': $attrs});
  })
  .controller('DetailPieChartCtrl', function($scope, $rootScope, MedicationsSearchService, $controller, $attrs) {
    $attrs.limit = '20';
    $attrs.detailSection = true;
    $controller('PieChartCtrl', {'$scope': $scope, '$attrs': $attrs});
  });
