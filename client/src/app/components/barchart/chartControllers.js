'use strict';

var chartControllers = angular.module('ads.chartControllers',['nvd3','ads.services.openfda']);

	// Turn off debug logging in NVD3
	nv.dev = false;

    chartControllers.controller('BarChartCtrl', function($scope, $rootScope, DrugEventService){

        $scope.serious = false;

        $scope.query = null;
		$scope.prescriptions = [];

        $scope.adverseEvents = null;

        // the options object is used by the NVD3 chart specifically and controls the output
        $scope.options = {
    	        chart: {
    	            type: 'multiBarHorizontalChart',
    	            height: 450,
                    margin : {
                        top: 20,
                        right: 100,
                        bottom: 60,
                        left: 192
                    },
                    x: function(d){return d.term;},
    	            y: function(d){return d.percent;},
    	            //yErr: function(d){ return [-Math.abs(d.value * Math.random() * 0.3), Math.abs(d.value * Math.random() * 0.3)] },
    	            showControls: false,
    	            stacked: false,
    	            showValues: true,
    	            showLegend: true,
    	            transitionDuration: 500,
    	            barColor: function (d, i) {
    	            	var colors = d3.scale.category20().range().slice(10);
    	                return d.color || colors[i % colors.length];
    	            },
    	            xAxis: {
    	                showMaxMin: false
    	            },
    	            yAxis: {
    	                axisLabel: 'Top Adverse Event Symptom Occurrences',
    	                tickFormat: function(d){
    	                    return d3.format(',.2%')(d);
    	                }
    	            },
    	            valueFormat: function(d) {
    	            	return d3.format(',.2%')(d);
    	            },
    	            interactive: true,
    	            tooltip: function(key, x, y) {
    	                return '<h3>' + key + '</h3>' + '<p>' +  y + ' at ' + x + '</p>';
    	            }
    	        }
            };

        /**
         * utility function used to set the Y Axis label including the count of records the query returned
         */
        $scope.setAdditionalScopeInfo = function( recCount, windowSize ) {
        	$scope.options.chart.yAxis.axisLabel = 'Top ' + recCount + ' Adverse Event Symptom Occurrences';
        	// Set chart size to 80% of screen width if that width is over 400; otherwise set chart to screen size
        	if( windowSize <= 400 ) {
            	$scope.options.chart.width = windowSize;
            	$scope.options.chart.margin.left = 100;
            	$scope.options.chart.showValues = false;
            	$scope.options.chart.callback = function() {
	            	d3.selectAll('text').style('font-size', '6px');
            	};
        	}
//        	console.log( 'window.screen.size: ' + windowSize );
//        	console.log( 'Chart width: ' + $scope.options.chart.width );
        };

        /**
         * This function is called as the result of a 'broadcast' event being fired by the SearchFieldCtrl
         * when the user enters a medication into the entry field. This function is responsible for building and
         * executing the query, then transforming the return data to what the chart expects
         *
         */
        $scope.$on( 'updateSearchParameters', function(event, adverseEvents) {
        	// var searchString = $scope.buildSearchText(adverseEvents.prescriptions);

			$scope.adverseEvents = adverseEvents;
			$scope.prescriptions = adverseEvents.prescriptions;

			if(!_.isEmpty(adverseEvents)) {
          		$scope.refreshChartWithLatestData();
			}
        });

        /**
         * Helper function called to execute 2 queries on the service; the first gets the total count of reports
         * for the combination passed, and the second actually gets the adverse events reported
         */
        $scope.refreshChartWithLatestData = function() {
          var searchString = $scope.buildSearchText($scope.adverseEvents.prescriptions);
          if ($scope.serious) {
            searchString = searchString + ' AND serious:1';
          }
          // Just setting the 'search' parm without the count will get the total number of reports
          $scope.query = {
            'search' : searchString
          };

          $scope.options.chart.noData = null;
          DrugEventService.get($scope.query, function(data) {
        	  $scope.totalReports = data.meta.results.total;
              $scope.query = {
                      'search' : searchString,
                      'count' : 'patient.reaction.reactionmeddrapt.exact',
                      'limit' : '20'
                    };
              		// When the first query is successful go get the event counts
                    $scope.getData();
            }, function(error) {
            	// Prepare to show an error if there was a problem with the query
            	console.log( 'error from get total reports: ' + error);
        		$scope.chartData = [];
        		$scope.options.chart.noData = error.data.error.message || error.status;
            });
        };

        /**
         * this function is responsible for calling the DrugEventService with the query that was
         * built previously. If no query has been built, then the function does nothing
         */
        $scope.getData = function(){
        	if( $scope.query ) {
        		$scope.chartData = [];
                DrugEventService.get($scope.query, function(data) {
                	$scope.translateData(data);
                    $scope.recCount = data.results.length;
//                    console.log('Returned data: ' + $scope.recCount);
                    $scope.setAdditionalScopeInfo($scope.recCount, window.screen.width);
                  }, function(error) {
                  	// Prepare to show an error if there was a problem with the query
                  	console.log( 'error from get symptom count: ' + error);
              		$scope.chartData = [];
              		$scope.options.chart.noData = error.data.error.message || error.status;
                  });
        	}
        };

        /**
         * This method is responsible for translating the data received from the query into the data
         * that we want to display on the chart. It creates a percentage value based on the total number of
         * reports and the count of each adverse event.
         */
        $scope.translateData = function(data) {
        	// now put the output data into our 'chartData'
        	$scope.chartData = [
                {
                	key: 'Adverse Events',
                	values: []
                }
            ];
        	for( var i=0; i<data.results.length; i++ ) {
        		$scope.chartData[0].values[i] = {
    				term: data.results[i].term,
    				count: data.results[i].count,
    				percent: data.results[i].count / $scope.totalReports
        		};
        	}
        };

        /**
         * function responsible for taking the medications sent from the SearchFieldCtrl and creating the
         * search text that will be passed on to the DrugEventService
         */
        $scope.buildSearchText = function (medications) {
        	var fieldName = 'patient.drug.medicinalproduct:';
        	var searchString = fieldName;
        	for(var i=0; i<medications.length; i++) {
        		searchString = searchString + '"' + medications[i] + '"';
        		if( i !== medications.length-1 ) {
        			searchString = searchString + ' AND ' + fieldName;
        		}
        	}
        	return searchString;
        };

        /**
         * Creates part of the message that will be displayed on the chart
         */
		$scope.reducePrescriptions = function(prescriptions) {
			var list = _.reduce(prescriptions, function(memo, value, index) {
				if(index === prescriptions.length - 1) {
					return memo + (prescriptions.length === 2 ? ' and ' : ', and ') + value;
				}
				else {
					return memo + ', ' + value;
				}
			});

			return (prescriptions.length > 1 ? ' combination of ' : ' use of ' ) + list;
		};
    });
