'use strict';

var chartControllers = angular.module('ads.chartControllers',['nvd3','ads.services.openfda']);

	
    chartControllers.controller('BarChartCtrl', function($scope, DrugEventService){

//	      'search': 'patient.drug.openfda.generic_name:"promethazine" AND ' +
//	      			'patient.drug.openfda.generic_name:"amitriptyline hydrochloride" AND ' +
//	      			'patient.drug.openfda.generic_name:"acetaminophen"',
//	      'count' : 'patient.reaction.reactionmeddrapt.exact',
//	      'limit' : '20'
    	
        var query = {};

//        DrugEventService.get(query, function(data) {
//          console.log(data);
//          $scope.data = [
//             {
//            	 key: 'Adverse Events',
//            	 values: data.results
//             }];
//        });
            
        $scope.options = {
	        chart: {
	            type: 'multiBarHorizontalChart',
	            height: 450,
                margin : {
                    top: 20,
                    right: 100,
                    bottom: 60,
                    left: 300
                },
                x: function(d){return d.term;},
	            y: function(d){return d.count;},
	            //yErr: function(d){ return [-Math.abs(d.value * Math.random() * 0.3), Math.abs(d.value * Math.random() * 0.3)] },
	            showControls: true,
	            showValues: true,
	            transitionDuration: 500,
	            xAxis: {
	                showMaxMin: false
	            },
	            yAxis: {
	                axisLabel: 'Adverse Event Occurrences',
	                tickFormat: function(d){
	                    return d3.format(',.2f')(d);
	                }
	            }
	        }
        };

        $scope.$on( 'updatePrescriptions', function(event, data) {
        	var searchString = buildSearchText(data);
        	query = {
              'search' : searchString,
      	      'count' : 'patient.reaction.reactionmeddrapt.exact',
    	      'limit' : '20'
        	};
        	getData();
        });
        
        function getData() {
        	if( query.length > 0 ) {
                DrugEventService.get(query, function(data) {
                    console.log(data);
                    $scope.data = [
                       {
                      	 key: 'Adverse Events',
                      	 values: data.results
                       }];
                  });
        	}
        }

        function buildSearchText(medications) {
        	var fieldName = 'patient.drug.openfda.generic_name: ';
        	var searchString = fieldName;
        	for(i=0; i<medications.length; i++) {
        		searchString = searchString + '"' + medicationj + '"';
        		if( i != medications.length-1 ) {
        			searchString = searchString + " AND " + fieldName;
        		}
        	}
        	return searchString;
        }
    });