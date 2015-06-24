'use strict';

var chartControllers = angular.module('ads.chartControllers',['nvd3','ads.services.openfda']);


    chartControllers.controller('BarChartCtrl', function($scope, $rootScope, DrugEventService){

        var query = {};

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
	                axisLabel: 'Adverse Event Occurrences',
	                tickFormat: function(d){
	                    return d3.format(',.0f')(d);
	                }
	            }
	        }
        };

        $rootScope.$on( 'updatePrescriptions', function(event, adverseEvents) {
        	var searchString = $scope.buildSearchText(adverseEvents.prescriptions);
            if (adverseEvents.serious) {
                searchString = searchString + ' AND serious:1'
            }
        	query = {
              'search' : searchString,
      	      'count' : 'patient.reaction.reactionmeddrapt.exact',
    	      'limit' : '20'
        	};
        	$scope.getData();
        });

        $scope.getData = function(){
        	if( query ) {
        		$scope.chartData = [];
                DrugEventService.get(query, function(data) {
                    $scope.chartData = [
                       {
                      	 key: 'Adverse Events',
                      	 values: data.results
                       }];
                  });
        	}
        };

        $scope.buildSearchText = function (medications) {
        	var fieldName = 'patient.drug.openfda.brand_name:';
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
