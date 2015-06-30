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

    $scope.buttons = {
      showAge: true,
      showWeight: true,
      showGender: true
    };

    $rootScope.$on( 'updateSearchParameters', function(event, adverseEvents) {
      $scope.adverseEvents = adverseEvents;
      // Load the top 20 charts when a search for medications is kicked off.
      if (!$attrs.detailSection && adverseEvents.prescriptions.length > 0) {
        $scope.buttons.showAge = true;
        $scope.buttons.showGender = true;
        $scope.buttons.showWeight = true;
      }
    });

    $scope.showAgeGraph = function() {
      loadAgeChartData();
      $scope.buttons.showAge = false;
    }

    $scope.showWeighGraph = function() {
      loadWeightChartData();
      $scope.buttons.showWeight = false;
    }

    $scope.showGenderGraph = function() {
      loadSexChartData();
      $scope.buttons.showGender = false;
    }

    $scope.showCharts = false;

    $rootScope.$on( 'symptomChanged', function(event, symptom) {
      $scope.symptomName = symptom.name;
      if ($attrs.detailSection) {
        if ($scope.symptomName) {
          $scope.showCharts = true;
          $scope.adverseEvents = symptom.adverseEvents;
          $scope.buttons.showAge = true;
          $scope.buttons.showGender = true;
          $scope.buttons.showWeight = true;
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
          tooltips: false,
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
      options.chart.color = function(d) {
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

    function setWeightChartOptions() {
      var options = getDefaultChartOptions();
      $scope.weightOptions = options;
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

      queryEndpointByAgeRange('< 25', '[0 TO 24]', setAgeChartOptions);
      queryEndpointByAgeRange('25-49', '[25 TO 49]');
      queryEndpointByAgeRange('50-74', '[50 TO 74]');
      queryEndpointByAgeRange('Over 75', '[75 TO 150]');

    }

    function loadWeightChartData() {

      $scope.weightChartData = [];

      queryEndpointByWeightRange('< 100', getKgRangeInPounds(0, 99), setWeightChartOptions);
      queryEndpointByWeightRange('100-199', getKgRangeInPounds(100, 199));
      queryEndpointByWeightRange('200-299', getKgRangeInPounds(200, 299));
      queryEndpointByWeightRange('Over 300', getKgRangeInPounds(300, 1000));

    }

    function getKgRangeInPounds(startKg, endKg) {
      var startLbs = kgToPound(startKg);
      var endLbs = kgToPound(endKg);
      return '[' + startLbs + ' TO ' + endLbs + ']';
    }

    function queryEndpointByAgeRange(label, searchRange, setChartOptionsCallback) {
      queryEndpointByRange('patient.patientonsetage', label, searchRange, $scope.ageChartData, setChartOptionsCallback);
    }

    function queryEndpointByWeightRange(label, searchRange, setChartOptionsCallback) {
      queryEndpointByRange('patient.patientweight', label, searchRange, $scope.weightChartData, setChartOptionsCallback);
    }

    function queryEndpointByRange(searchField, label, searchRange, chartData, setChartOptionsCallback) {
      var searchCriteria = ' AND ' + searchField + ':' + searchRange;
      if ($attrs.detailSection) {
        searchCriteria = searchCriteria + ' AND patient.reaction.reactionmeddrapt:' + $scope.symptomName;
      }
      MedicationsSearchService.query($scope.adverseEvents, searchCriteria, 'receivedateformat', null, function(data) {
        var i, result;
        for (i = 0; i < data.results.length; ++i) {
          result = data.results[i];
          chartData.push({
            key: label,
            y: result.count
          });
        }
        if (setChartOptionsCallback) {
          setChartOptionsCallback();
        }
      });
    }

    function kgToPound(kg) {
      return kg/2.20462;
    }

  })
  .controller('Top20PieChartCtrl', function($scope, $rootScope, MedicationsSearchService, $controller, $attrs) {
    $attrs.detailSection = false;
    $controller('PieChartCtrl', {'$scope': $scope, '$attrs': $attrs});
  })
  .controller('DetailPieChartCtrl', function($scope, $rootScope, MedicationsSearchService, $controller, $attrs) {
    $attrs.detailSection = true;
    $controller('PieChartCtrl', {'$scope': $scope, '$attrs': $attrs});
  });
