'use strict';

angular.module('mockDrugEventService', [] )

.factory('MockDrugEventService', function() {
	return {
		get: function(query, callback) {
			var data = {
			    meta: {
				  results: {
				      skip:  0,
				      limit: 1,
				      total: 2
				  }
			    },				
				results: [
	            {
					count: 7,
					term:'NAUSEA'
				},
				{
					count: 8,
					term: 'DIZZINESS'
				}
				]};
			callback(data);
		}
	};

});

describe('BarChart Controller', function() {
	beforeEach(module('ads.main'));
	beforeEach(module('mockDrugEventService'));
	beforeEach(module('ads.chartControllers'));

  describe('BarChartCtrl', function() {
    var scope, ctrl;

    beforeEach( inject( function($controller, $rootScope, MockDrugEventService ) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
//      console.log( '---->DEBUG: beforeEach - creating scope and controller');
      scope = $rootScope.$new();
      ctrl = $controller('BarChartCtrl',
			      		{$scope: scope,
			      	     DrugEventService: MockDrugEventService
			      		});

    }));

    it('verifies the scope.options.chart.x function', function() {
    	var source = {
    		term: 'Symptom',
    		count: 1,
    		percent: 20
    	};
    	var check = scope.options.chart.x(source);
    	expect(check).toBe('Symptom');
    });
    
    it('verifies the scope.options.chart.y function', function() {
    	var source = {
    		term: 'Symptom',
    		count: 1,
    		percent: 20
    	};
    	var check = scope.options.chart.y(source);
    	expect(check).toBe(20);
    });
    
    it('verifies the scope.options.chart.barColor function', function() {
    	var d = {
			color: null
    	};
    	var i = 0;
    	// verify a return when we don't pass a color ourselves
    	var barColor = scope.options.chart.barColor(d, i);
    	expect(barColor).not.toBe(null);
//    	console.log('barColor returned: ' + barColor);
    	// now verify the return when there's already a color set on 'd'
    	d.color = 'red';
    	barColor = scope.options.chart.barColor(d, i);
    	expect(barColor).toBe('red');
    });
    
    it('verifies the scope.options.chart.yAxis.tickFormat function', function() {
    	var tick = 0.0560;
    	var expectedResult = '5.60%';
    	var formattedTick = scope.options.chart.yAxis.tickFormat(tick);
    	expect(formattedTick).toBe(expectedResult);
    });
    
    it('verifies the scope.options.chart.valueFormat function', function() {
    	var value = 0.0650;
    	var expectedResult = '6.50%';
    	var formattedValue = scope.options.chart.valueFormat(value);
    	expect(formattedValue).toBe(expectedResult);
    });
    
    it('verifies the scope.options.chart.tooltip function', function() {
    	var key = 'Adverse Events';
    	var x = 'NAUSEA';
    	var y = '50%';
    	var expectedTooltip = '<h3>' + key + '</h3>' + '<p>' +  y + ' at ' + x + '</p>';
    	var tooltip = scope.options.chart.tooltip( key, x, y, null);
    	expect(tooltip).toEqual(expectedTooltip);
    });
    
    it('verifies the buildSearchText method', function(){
    	var medications = ['promethazine', 'acetaminophen'];
    	var expectedText = 'patient.drug.medicinalproduct:"promethazine" AND patient.drug.medicinalproduct:"acetaminophen"';
    	var searchText = scope.buildSearchText( medications );
    	expect(searchText).toEqual(expectedText);
    });

    it('verifies the setAdditionalScopeInfo function', function() {
    	var phoneScreenWidth = 320;
    	var recCount = 10;
    	var axisLabel = 'Top ' + recCount + ' Adverse Event Symptom Occurrences';
    	// Get the existing value of the left margin - we'll test against this
    	var leftMargin = scope.options.chart.margin.left;
    	scope.setAdditionalScopeInfo(recCount, window.screen.width);
    	expect(scope.options.chart.margin.left).toEqual(leftMargin);
    	expect(scope.options.chart.yAxis.axisLabel).toEqual(axisLabel);
    	expect(scope.options.chart.width).toBeUndefined();

    	// now set the window.screen.width value to verify changes
    	scope.setAdditionalScopeInfo(recCount, phoneScreenWidth);
    	expect(scope.options.chart.margin.left).toEqual(100);
    	expect(scope.options.chart.yAxis.axisLabel).toEqual(axisLabel);
    	expect(scope.options.chart.width).toBe(phoneScreenWidth);
    	expect(scope.options.chart.showValues).toBeFalsy();
    	expect(scope.options.chart.callback).toBeDefined();
    });
    
    it( 'verifies that query does not run if the query value has not been set', function() {
        scope.getData();

        expect(scope.chartData).toBeUndefined();
    });

    it('verifies the query transforms the data and returns the expected count', function() {
    	scope.totalReports = 2;
        scope.query = {
          'search' : 'some text',
	      'count' : 'patient.reaction.reactionmeddrapt.exact',
	      'limit' : '20'
	    };

        scope.getData();

        expect(scope.chartData).toBeDefined();
        // the query should move the results data from a field called 'results' to a field called 'value'
        expect(scope.chartData.results).toBeUndefined();
        expect(scope.chartData[0].values).toBeDefined();
        
        // expected percentage is count for first item divided by total of all counts
        var expectedPercentage = 7 / 2;
        
        // now verify that the data meets our expectations
        expect(scope.chartData[0].values.length).toEqual(2);
        expect(scope.chartData[0].values[0].term).toEqual('NAUSEA');
        expect(scope.chartData[0].values[0].count).toEqual(7);
        expect(scope.chartData[0].values[0].percent).toEqual(expectedPercentage);
        
      });

      it('verifies the message that will be displayed on the chart', function() {
    	 var singleExpected = ' use of promethazine';
    	 var dualExpected = ' combination of promethazine and ibuprofen';
    	 var multiExpected = ' combination of promethazine, ibuprofen, and losartan';
    	 var prescriptions = ['promethazine'];
    	 var message = scope.reducePrescriptions(prescriptions);
    	 expect(message).toEqual(singleExpected);
    	 
    	 prescriptions.push('ibuprofen');
    	 message = scope.reducePrescriptions(prescriptions);
    	 expect(message).toEqual(dualExpected);
    	 
    	 prescriptions.push('losartan');
    	 message = scope.reducePrescriptions(prescriptions);
    	 expect(message).toEqual(multiExpected);
    	 
      });
  });
});
