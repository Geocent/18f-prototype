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

    var chartDebug = true;
    $scope.pieCharts = {
      showAll: ($attrs.detailSection ? false : true),
      age: {
        showButton: true
      },
      gender: {
        showButton: true
      },
      weight: {
        showButton: true
      }
    };

    $rootScope.$on( 'totalAdverseEvents', function(event, adverseEvents) {
      $scope.adverseEvents = adverseEvents;
      // Load the top 20 charts when a search for medications is kicked off.
      if ($scope.adverseEvents.count > 0) {
        if (!$attrs.detailSection && adverseEvents.prescriptions.length > 0) {
          $scope.pieCharts.showAll = true;
          $scope.pieCharts.age.showButton = true;
          $scope.pieCharts.gender.showButton = true;
          $scope.pieCharts.weight.showButton = true;
        }
      } else {
        $scope.pieCharts.showAll = false;
      }
    });

    $scope.showAgeGraph = function() {
      loadAgeChartData();
      $scope.pieCharts.age.showButton = false;
    };

    $scope.showWeighGraph = function() {
      loadWeightChartData();
      $scope.pieCharts.weight.showButton = false;
    };

    $scope.showGenderGraph = function() {
      loadSexChartData();
      $scope.pieCharts.gender.showButton = false;
    };

    $rootScope.$on( 'symptomChanged', function(event, symptom) {
      $scope.symptomName = symptom.name;
      if ($attrs.detailSection) {
        if ($scope.symptomName) {
          $scope.pieCharts.showAll = true;
          $scope.adverseEvents = symptom.adverseEvents;
          $scope.pieCharts.age.showButton = true;
          $scope.pieCharts.gender.showButton = true;
          $scope.pieCharts.weight.showButton = true;
        } else {
          $scope.pieCharts.showAll = false;
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
          tooltips: true,
          legend: {
            margin: {
              top: 5,
              right: 35,
              bottom: 20,
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
      logCounts( $scope.ageChartData );
      var options = getDefaultChartOptions();
      $scope.ageOptions = options;
    }

    function setWeightChartOptions() {
      logCounts( $scope.weightChartData );
      var options = getDefaultChartOptions();
      $scope.weightOptions = options;
    }

    function logCounts(chartData) {
      if( chartDebug ) {
        for( var i=0; i<chartData.length; i++ ) {
	   	  console.log( 'item ' + i + ': ' + chartData[i].key + ', ' + chartData[i].y);
	    }
      }
    }
    
    function loadSexChartData() {
      var symptomQuery = null;
	  if ($attrs.detailSection) {
	    symptomQuery = ' AND patient.reaction.reactionmeddrapt:' + $scope.symptomName;
	  }

      MedicationsSearchService.query($scope.adverseEvents, symptomQuery, 'patient.patientsex', null, function(data) {
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
      }, function(error) {
        console.error( 'error from get total reports: ' + error);
        $scope.chartData = [];
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

      queryEndpointByAgeRange('< 25', '[0 TO 24]');
      queryEndpointByAgeRange('25-49', '[25 TO 49]');
      queryEndpointByAgeRange('50-74', '[50 TO 74]');
      queryEndpointByAgeRange('Over 75', '[75 TO 150]');
      queryMissingValues( 'patient.patientonsetage', 'Unknown', $scope.ageChartData, setAgeChartOptions );
    }

    function loadWeightChartData() {

      $scope.weightChartData = [];

//      queryEndpointByWeightRange('< 100', getKgRangeInPounds(0, 99));
//      queryEndpointByWeightRange('100-199', getKgRangeInPounds(100, 199));
//      queryEndpointByWeightRange('200-299', getKgRangeInPounds(200, 299));
//      queryEndpointByWeightRange('Over 300', getKgRangeInPounds(300, 1000));
      // TODO: Hate to do this but the translation from pounds to kilos is causing us to miss weight values. Simplest is to 
      // 	   hardcode the ranges to make sure that we pick up everyone we want
      queryEndpointByWeightRange('< 100', '[0 TO 44]');
      queryEndpointByWeightRange('100-199', '[45 TO 90]');
      queryEndpointByWeightRange('200-299', '[91 TO 135]');
      queryEndpointByWeightRange('Over 300', '[136 TO 454]');
      queryMissingValues( 'patient.patientweight', 'Unknown', $scope.weightChartData, setWeightChartOptions );

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
        if( chartDebug) {
          console.log('searching for: ' + searchCriteria);
    	}
        $scope.searchCriteria = searchCriteria;
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
        }, function(error) {
          console.error( 'error from query was: ' + error.data.error.message);
          // Empties array without having original reference.
//          chartData.splice(0,chartData.length);
          if (setChartOptionsCallback) {
            setChartOptionsCallback();
          }
        });
      }

    function queryMissingValues(searchField, label, chartData, setChartOptionsCallback) {
        var searchCriteria = ' AND _missing_:' + searchField;
        if ($attrs.detailSection) {
          searchCriteria = searchCriteria + ' AND patient.reaction.reactionmeddrapt:' + $scope.symptomName;
        }
        if(chartDebug) {
          console.log('queryMissingValues searching for: ' + searchCriteria);
        }
        $scope.searchCriteria = searchCriteria;
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
        }, function(error) {
          console.error( 'error from query was: ' + error.data.error.message);
          // Empties array without having original reference.
//          chartData.splice(0,chartData.length);
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
