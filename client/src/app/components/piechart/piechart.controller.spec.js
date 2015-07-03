'use strict';

describe('ads.piechart', function(){
  var scope;
  var rootScope;
  var attrs;

  var MedicationsSearchService = {
    query: function(adverseEvents, additionalSearchCriteria, countField, limit, successCallback, failureCallback) {
      successCallback({
        results: [
          {
            term: 1,
            count: 10
          }
        ]
      });
    }
  };

  beforeEach(module('ads.piechart'));

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    rootScope = $rootScope;
    attrs = {
      detailSection: false
    };


    spyOn(MedicationsSearchService, 'query').and.callThrough();

    $controller('PieChartCtrl', { $scope: scope, $rootScope: rootScope, $attrs: attrs, MedicationsSearchService: MedicationsSearchService });
  }));

  it('should show the age graph and hide the associated button', function() {
    expect(scope.pieCharts.age.showButton).toBe(true);
    scope.showAgeGraph();
    expect(scope.pieCharts.age.showButton).toBe(false);
  });

  it('should show the weight graph and hide the associated button', function() {
    expect(scope.pieCharts.weight.showButton).toBe(true);
    scope.showWeighGraph();
    expect(scope.pieCharts.weight.showButton).toBe(false);
  });

  it('should show the gender graph and hide the associated button', function() {
    expect(scope.pieCharts.gender.showButton).toBe(true);
    scope.showGenderGraph();
    expect(scope.pieCharts.gender.showButton).toBe(false);
  });
});
