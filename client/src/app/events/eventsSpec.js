'use strict';

angular.module('mockDrugEventService', [] )

.factory('DrugEventService', function($q) {
	var drugEventService = {};
	
	drugEventService.get = function() {
		return {
			count: 7,
			term:'NAUSEA'				
		};
	};
});

describe('Events Controller', function() {
	beforeEach(module('ads.main'));
	beforeEach(module('mockDrugEventService'));
	beforeEach(module('ads.events'));

  describe('AdverseEventsCtrl', function() {
    var scope, ctrl;

    beforeEach(inject(function($controller, $rootScope, DrugEventService ){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      scope = $rootScope.$new();
      ctrl = $controller('AdverseEventsCtrl', 
			      		{$scope: scope, 
			      	     DrugEventService: DrugEventService
			      		});
      
    }));

    it('verifies the query', function() {
      expect(scope.items.length).toEqual(1);
    });

  });
});