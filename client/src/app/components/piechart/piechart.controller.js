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
        loadAggregatedAgeChartData();
        loadAggregatedWeightChartData();
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
          loadAggregatedAgeChartData();
          loadAggregatedWeightChartData();
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

      queryEndpointByWeightRange('< 100', '[0 TO 99]', setWeightChartOptions);
      queryEndpointByWeightRange('100-149', '[100 TO 149]');
      queryEndpointByWeightRange('150-199', '[150 TO 199]');
      queryEndpointByWeightRange('200-249', '[200 TO 249]');
      queryEndpointByWeightRange('250-300', '[250 TO 300]');
      queryEndpointByWeightRange('Over 300', '[300 TO 1000]');

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

    function loadAggregatedAgeChartData() {
      var ranges = [
        {start: 0, end: 24, label: '< 25', total: 0},
        {start: 25, end: 49, label: '25-49', total: 0},
        {start: 50, end: 74, label: '50-74', total: 0},
        {start: 75, end: 150, label: 'Over 75', total: 0}
      ];
      $scope.ageChartData = [];
      queryEndpointAggregatingBy('patient.patientonsetage', ranges, $scope.ageChartData, setAgeChartOptions);
    }

    function loadAggregatedWeightChartData() {
      var ranges = [
        {start: 0, end: 99, label: '< 100', total: 0},
        {start: 100, end: 149, label: '100-149', total: 0},
        {start: 150, end: 199, label: '150-199', total: 0},
        {start: 200, end: 249, label: '200-249', total: 0},
        {start: 250, end: 299, label: '250-299', total: 0},
        {start: 300, end: 1000, label: 'Over 300', total: 0}
      ];
      $scope.weightChartData = [];
      queryEndpointAggregatingBy('patient.patientweight', ranges, $scope.weightChartData, setWeightChartOptions);
    }

    /**
     *
     * @param field - Aggregate the search on this field.
     * @param ranges - Further aggregate the results by these ranges, storing the result inside this object.
     * @param chartData - Add the ranges to populate the chart.
     * @param setChartOptionsCallback - Set the chart options after the data is there.
     */
    function queryEndpointAggregatingBy(field, ranges, chartData, setChartOptionsCallback) {
      var additionalSearchCriteria = null;
      if ($attrs.detailSection) {
        additionalSearchCriteria = ' AND patient.reaction.reactionmeddrapt:' + $scope.symptomName;
      }
      MedicationsSearchService.query($scope.adverseEvents, additionalSearchCriteria, field, null, function(data) {
        var i, j, result, range;
        for (i = 0; i < data.results.length; ++i) {
          result = data.results[i];
          for (j = 0; j < ranges.length; ++j) {
            range = ranges[j];
            if (range.start <= result.term && Math.floor(result.term) <= range.end) {
              range.total = range.total + result.count;
            }
          }
        }
        for (i = 0; i < ranges.length; ++i) {
          range = ranges[i];
          chartData.push({
            key: range.label,
            y: range.total
          })
        }
        setChartOptionsCallback();
      });
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
