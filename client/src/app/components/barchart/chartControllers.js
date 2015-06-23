'use strict';

var chartControllers = angular.module('ads.chartControllers',['nvd3','ads.services.openfda']);

	
    chartControllers.controller('BarChartCtrl', function($scope, $rootScope, DrugEventService){

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
	                    return d3.format(',.0f')(d);
	                }
	            }
	        }
        };

        $rootScope.$on( 'updatePrescriptions', function(event, medications) {
        	var searchString = $scope.buildSearchText(medications.prescriptions);
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
                    console.log(data);
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