'use strict';

angular.module('mockDrugEventService', [] )

.factory('MockDrugEventService', function() {
	return {
		get: function(query, callback) {
			var data = { results: [
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

    it('verifies the buildSearchText method', function(){
    	var medications = ['promethazine', 'acetaminophen'];
    	var expectedText = 'patient.drug.medicinalproduct:"promethazine" AND patient.drug.medicinalproduct:"acetaminophen"';
    	var searchText = scope.buildSearchText( medications );
    	expect(searchText).toEqual(expectedText);
    });

    it( 'verifies that query does not run if the query value has not been set', function() {
        scope.getData();

        expect(scope.chartData).toBeUndefined();
    });

    it('verifies the query transforms the data and returns the expected count', function() {
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
        var expectedPercentage = 7 / 15;
        
        // now verify that the data meets our expectations
        expect(scope.chartData[0].values.length).toEqual(2);
        expect(scope.chartData[0].values[0].term).toEqual('NAUSEA');
        expect(scope.chartData[0].values[0].count).toEqual(7);
        expect(scope.chartData[0].values[0].percent).toEqual(expectedPercentage);
        
      });

  });
});
