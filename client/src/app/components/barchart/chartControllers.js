'use strict';

var chartControllers = angular.module('chartControllers',['nvd3']);

    chartControllers.controller('BarChartCtrl', function($scope){

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

        $scope.data = [
            {
                key: 'Cumulative Return',
                values: [
                          {
                             'term': 'NAUSEA',
                             'count': 7
                           },
                           {
                             'term': 'PAIN',
                             'count': 6
                           },
                           {
                             'term': 'MYOCARDIAL INFARCTION',
                             'count': 5
                           },
                           {
                             'term': 'FATIGUE',
                             'count': 5
                           },
                           {
                             'term': 'DEPRESSION',
                             'count': 5
                           },
                           {
                             'term': 'VOMITING',
                             'count': 4
                           },
                           {
                             'term': 'PYREXIA',
                             'count': 4
                           },
                           {
                             'term': 'INSOMNIA',
                             'count': 4
                           },
                           {
                             'term': 'HYPERTENSION',
                             'count': 4
                           },
                           {
                             'term': 'CONSTIPATION',
                             'count': 4
                           },
                           {
                             'term': 'BACK PAIN',
                             'count': 4
                           },
                           {
                             'term': 'ANXIETY',
                             'count': 4
                           }
                   ]
            }
        ];
    });