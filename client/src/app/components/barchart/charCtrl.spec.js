'use strict';

angular.module('mockDrugEventService', [] )

.factory('MockDrugEventService', function($q) {
	var drugEventService = {};
	
//	drugEventService.get = function() {
//		return {
//			count: 7,
//			term:'NAUSEA'				
//		};
//	};
	
	return {
		get: function(query, callback) {
			var data = { results: [
	            {
					count: 7,
					term:'NAUSEA'				
				}]};
			callback(data);
		}
	};
	
});

describe('BarChart Controller', function() {
//	beforeEach(module('client'));
	beforeEach(module('ads.main'));
	beforeEach(module('mockDrugEventService'));
	beforeEach(module('ads.chartControllers'));

  describe('BarChartCtrl', function() {
    var scope, ctrl;

    beforeEach( inject( function($controller, $rootScope, MockDrugEventService ) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      console.log( '---->DEBUG: beforeEach - creating scope and controller');
      scope = $rootScope.$new();
      ctrl = $controller('BarChartCtrl', 
			      		{$scope: scope, 
			      	     DrugEventService: MockDrugEventService
			      		});
      
    }));

    it('verifies the buildSearchText method', function(){
    	var medications = ['promethazine', 'acetaminophen'];
    	var expectedText = 'patient.drug.openfda.brand_name:"promethazine" AND patient.drug.openfda.brand_name:"acetaminophen"';
    	var searchText = scope.buildSearchText( medications );
    	expect(searchText).toEqual(expectedText);
    });
    
    it('verifies the query', function() {
      scope.getData();
      expect(scope.chartData.length).toEqual(1);
    });

  });
});