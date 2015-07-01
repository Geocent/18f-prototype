'use strict';

describe('ads.services.openfda', function(){

    beforeEach(function(){
        module(function($provide){
            $provide.value('fdaApiUrl', 'http://example.gov/rest');
        });

        module('client');
        module('ads.services.openfda');
    });

    it('DrugEventService tests', inject(function(DrugEventService, $resource) {
        expect(new DrugEventService($resource, 'apikey', 'http://example.com/rest').$get).toBeDefined();
    }));

    it('DrugEnforcementService tests', inject(function(DrugEnforcementService, $resource) {
        expect(new DrugEnforcementService($resource, 'apikey', 'http://example.com/rest').$get).toBeDefined();
    }));

    it('DrugLabelingService tests', inject(function(DrugLabelingService, $resource) {
        expect(new DrugLabelingService($resource, 'apikey', 'http://example.com/rest').$get).toBeDefined();
    }));

    it('MedicationsSearchService tests',
        inject(function(MedicationsSearchService) {

            expect(MedicationsSearchService.query).toBeDefined();

            MedicationsSearchService.query({
                    serious: false,
                    prescriptions: ['A', 'B', 'C']
                },
                'AND test="value"',
                'coutfield',
                500,
                function(data){
                    console.log(data);
                },
                function(error){
                    console.log(error);
                });
        }));
});
