'use strict';

describe('ads.datachart', function(){
  var controller;
  var location;
  var http;
  var httpBackend;
  var httpRequest;
  var scope;
  var timeout;
  var rootScope;

  var dataChartController;

  var DrugEventService = {
      get: function(data, callback) {
          if(data.count) {
              callback({
                  results: [
                      { term: 'X' },
                      { term: 'Y' },
                      { term: 'Z' }
                  ]
              });
          }
          else {
              callback({
                  meta: {
                      results: {
                          total: 2
                      }
                  },
                  results: [
                      {
                          patient: {
                              patientonsetage: 30,
                              patientonsetageunit: 801,
                              patientweight: 100,
                              patientsex: '1',
                              drug: [
                                  {medicinalproduct: 'aaa'},
                                  {medicinalproduct: 'bbb'},
                                  {medicinalproduct: 'ccc'}
                              ],
                              reaction: [
                                  {reactionmeddrapt: 'xxx'},
                                  {reactionmeddrapt: 'yyy'},
                                  {reactionmeddrapt: 'zzz'}
                              ]
                          }
                      },
                      {
                          serious: '1',
                          patient: {
                              patientsex: '2',
                              drug: [
                                  {medicinalproduct: 'aaa', drugcharacterization: '1'},
                                  {},
                              ],
                              reaction: [
                                  {reactionmeddrapt: 'xxx', reactionoutcome: '5'}
                              ]
                          }
                      }
                  ]
              });
          }
      }
  };

  beforeEach(module('ads.datachart'));

  beforeEach(inject(function($controller, $http, $httpBackend, $location, $rootScope, $timeout) {
    scope = $rootScope.$new();

    controller = $controller;
    http = $http;
    httpBackend = $httpBackend;
    location = $location;
    rootScope = $rootScope;
    timeout = $timeout;

    spyOn(DrugEventService, 'get').and.callThrough();
    spyOn(rootScope, '$broadcast').and.callThrough();

    dataChartController = $controller('DataChartCtrl', { $scope: scope, $rootScope: $rootScope, $http: $http, $location: $location, $timeout: $timeout, DrugEventService: DrugEventService});
  }));

  it('Validate prescription reduction', function() {
      expect(scope.reducePrescriptions(['A'])).toBe('A.');
      expect(scope.reducePrescriptions(['A', 'B'])).toBe('A and B together.');
      expect(scope.reducePrescriptions(['A', 'B', 'C'])).toBe('A, B, and C together.');
      expect(scope.reducePrescriptions(['A', 'B', 'C', 'D'])).toBe('A, B, C, and D together.');
  });

  it('Recieve empty updateSearchParameters', function() {
      rootScope.$broadcast('updateSearchParameters', {
          serious: true,
          prescriptions: []
      });

      expect(DrugEventService.get).not.toHaveBeenCalled();
  });

  it('Receive valid updateSearchParameters', function() {
      rootScope.$broadcast('updateSearchParameters', {
          serious: true,
          prescriptions: ['A', 'B', 'C']
      });

      expect(DrugEventService.get).toHaveBeenCalledWith({
          search: 'serious:1 AND patient.drug.medicinalproduct:"A" AND patient.drug.medicinalproduct:"B" AND patient.drug.medicinalproduct:"C"',
          count: 'patient.reaction.reactionmeddrapt.exact',
          limit: 1000
      }, jasmine.any(Function));

      expect(scope.symptoms).toEqual(['X', 'Y', 'Z']);
  });

  it('Receive updateSearchParameters with selectedSymptom', function() {
      scope.selectedSymptom = 'NAUSEA';

      rootScope.$broadcast('updateSearchParameters', {
          serious: true,
          prescriptions: ['A', 'B']
      });

       expect(DrugEventService.get).toHaveBeenCalledWith({
           search: 'serious:1 AND patient.drug.medicinalproduct:"A" AND patient.drug.medicinalproduct:"B"',
           count: 'patient.reaction.reactionmeddrapt.exact',
           limit: 1000
       }, jasmine.any(Function));

      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
        {
            serious: true,
            prescriptions: [ 'A', 'B' ]
        });

      expect(rootScope.$broadcast).toHaveBeenCalledWith('symptomChanged',
        {
            name: undefined,
            adverseEvents: {
                serious: true,
                prescriptions: ['A', 'B']
            }
        });
    });

    it('Update Report Table without page reset', function() {
        scope.selectedReportPage = 2;
        scope.selectedSymptom = 'xxx';
        scope.updateReportTable(false);

        expect(scope.selectedReportPage).toBe(2);
    });

    it('Update Report Table with page reset', function() {
        scope.selectedReportPage = 2;
        scope.selectedSymptom = 'xxx';
        scope.updateReportTable(true);

        expect(scope.selectedReportPage).toBe(1);
    });
});
