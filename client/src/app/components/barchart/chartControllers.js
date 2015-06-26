'use strict';

var chartControllers = angular.module('ads.chartControllers',['nvd3','ads.services.openfda']);

	// Turn off debug logging in NVD3
	nv.dev = false;

    chartControllers.controller('BarChartCtrl', function($scope, $rootScope, DrugEventService){

        $scope.query = null;

        // the options object is used by the NVD3 chart specifically and controls the output
        $scope.options = {
    	        chart: {
    	            type: 'multiBarHorizontalChart',
    	            height: 450,
                    margin : {
                        top: 20,
                        right: 100,
                        bottom: 60,
                        left: 200
                    },
                    x: function(d){return d.term;},
    	            y: function(d){return d.count;},
    	            //yErr: function(d){ return [-Math.abs(d.value * Math.random() * 0.3), Math.abs(d.value * Math.random() * 0.3)] },
    	            showControls: false,
    	            stacked: false,
    	            showValues: true,
    	            transitionDuration: 500,
    	            xAxis: {
    	                showMaxMin: false
    	            },
    	            yAxis: {
    	                axisLabel: 'Top Adverse Event Symptom Occurrences',
    	                tickFormat: function(d){
    	                    return d3.format(',.0f')(d);
    	                }
    	            },
    	            
    	            multiBarHorizontalChart: {
    	            	dispatch: {
    	            		on: {
	    	            		elementClick: function(e){
	    	            			console.log('element: ' + e.value);
	    	            		}
    	            		}
    	            	}
    	            }
//    	            tooltip: function(key, y, e, graph) {
//    	            	return '<b>' + y + '</b>';
//    	            }
    	        }
            };

        // utility function used to set the Y Axis label including the count of records the query returned
        function setAxisLabel( recCount ) {
        	$scope.options.chart.yAxis.axisLabel = 'Top ' + recCount + ' Adverse Event Symptom Occurrences';
        }

        // This function is called as the result of a 'broadcast' event being fired by the SearchFieldCtrl
        // when the user enters a medication into the entry field. This function is responsible for building and
        // executing the query, then transforming the return data to what the chart expects
        $rootScope.$on( 'updateSearchParameters', function(event, adverseEvents) {
        	var searchString = $scope.buildSearchText(adverseEvents.prescriptions);

            if (adverseEvents.serious) {
                searchString = searchString + ' AND serious:1';
            }
        	$scope.query = {
              'search' : searchString,
      	      'count' : 'patient.reaction.reactionmeddrapt.exact',
    	      'limit' : '200'
        	};
        	$scope.getData();
        });

        // this function is responsible for calling the DrugEventService with the query that was
        // built previously. If no query has been built, then the function does nothing
        $scope.getData = function(){
        	if( $scope.query ) {
        		$scope.chartData = [];
                DrugEventService.get($scope.query, function(data) {
                    $scope.chartData = [
                       {
                      	 key: 'Adverse Events',
                      	 values: data.results
                       }];
//                	$scope.translateData(data);
                    $scope.recCount = data.results.length;
                    console.log('Returned data: ' + $scope.recCount);
                    setAxisLabel($scope.recCount);
                  });
        	}
        };
        
        $scope.translateData = function(data) {
        	var totalEvents = 0;
        	// Compute the total
        	for( var i=0; i<data.results.length; i++ ) {
        		totalEvents += data.results[i].count;
        	}
        	// now put the output data into our 'chartData'
        	$scope.chartData = [
                {
                	key: 'Adverse Events',
                	values: [] 
//            		{
//            			term: null,
//            			count
//                	}
                }
            ];
        	for( i=0; i<20; i++ ) {
        		$scope.chartData[0].values[i].term = data.results[i].term;
        		$scope.chartData[0].values[i].count = data.results[i].count / totalEvents;
        	}
        };

        // function responsible for taking the medications sent from the SearchFieldCtrl and creating the
        // search text that will be passed on to the DrugEventService
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

    });
