'use strict';

describe('ads.searchfield', function(){
  var searchFieldController;
  var scope;
  var rootScope;

  beforeEach(module('ads.searchfield'));

  beforeEach(inject(function($controller, $http, $httpBackend, $rootScope) {
    scope = $rootScope.$new();
    rootScope = $rootScope;

    spyOn(rootScope, '$broadcast');

    $httpBackend.when('GET', '/assets/brand_names.json')
      .respond([
          {'id':'','name':'7 SELECT ACETAMINOPHEN'},
          {'id':'','name':'7 SELECT ADULT CHEWABLE ASPIRIN'},
          {'id':'','name':'7 SELECT ASPIRIN'},
          {'id':'','name':'7 SELECT CHILDRENS IBUPROFEN'},
          {'id':'','name':'7 SELECT CHILDRENS PAIN RELIEF'},
          {'id':'','name':'7 SELECT IBUPROFEN'},
          {'id':'','name':'7030 CALCIUM GOLD'},
          {'id':'','name':'7030 CALCIUM PREMIUM'},
          {'id':'','name':'8 HOUR PAIN RELIEF'},
          {'id':'','name':'ABILIFY'},
          {'id':'','name':'ABILIFY DISCMELT'},
          {'id':'','name':'ABSTRAL'},
          {'id':'','name':'ACEPHEN'},
          {'id':'','name':'ACETAMINOPHEN'},
          {'id':'','name':'ACETAMINOPHEN (RED)'},
          {'id':'','name':'ACETAMINOPHEN - APAP 8 HOUR'},
          {'id':'','name':'ACETAMINOPHEN - APAP ARTHRITIS'},
          {'id':'','name':'ACETAMINOPHEN 8 HOUR'},
          {'id':'','name':'ACETAMINOPHEN ARTHRITIS PAIN'},
          {'id':'','name':'ACETAMINOPHEN EASY TABS'},
          {'id':'','name':'ACETAMINOPHEN EXTRA STRENGTH'},
          {'id':'','name':'ACETAMINOPHEN FOR CHILDREN'},
          {'id':'','name':'ACETAMINOPHEN PAIN RELIEVER FEVER REDUCER'},
          {'id':'','name':'ACETAMINOPHEN RAPID RELEASE'},
          {'id':'','name':'ACETAMINOPHEN RAPID RELEASE EXTRA STRENGTH'}
      ]);

      searchFieldController = $controller('SearchfieldCtrl', { $scope: scope, $rootScope: $rootScope, $http: $http, });

    $httpBackend.flush();
  }));

  it('Proper brand name fetch', function() {
      expect(scope.brandNames.length).toEqual(25);
  });

  it('Initial empty prescription list', function() {
      expect(scope.prescriptions).toEqual([
          {value: ''}
      ]);
  });

  it('Adding a prescription to empty prescription list', function() {
      scope.prescriptions[0].value = 'ACEPHEN';
      scope.$digest();

      expect(scope.prescriptions).toEqual([
          {value: 'ACEPHEN'},
          {value: ''}
      ]);

      scope.updateSearchParameters();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
          { prescriptions: [ 'ACEPHEN' ]}
      );
  });

  it('Adding a prescription to existing prescription list', function() {
      scope.prescriptions[0].value = 'ACEPHEN';
      scope.$digest();

      expect(scope.prescriptions).toEqual([
          {value: 'ACEPHEN'},
          {value: ''}
      ]);

      scope.updateSearchParameters();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
          { prescriptions: [ 'ACEPHEN' ]}
      );

      scope.prescriptions[1].value = 'ABILIFY';
      scope.$digest();

      expect(scope.prescriptions).toEqual([
          {value: 'ACEPHEN'},
          {value: 'ABILIFY'},
          {value: ''}
      ]);

      scope.updateSearchParameters();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
          { prescriptions: [ 'ACEPHEN', 'ABILIFY' ]}
      );
  });

  it('Removing a prescription to existing prescription list', function() {
      scope.prescriptions[0].value = 'ACEPHEN';
      scope.$digest();

      scope.prescriptions[1].value = 'ABILIFY';
      scope.$digest();

      expect(scope.prescriptions).toEqual([
          {value: 'ACEPHEN'},
          {value: 'ABILIFY'},
          {value: ''}
      ]);

      scope.updateSearchParameters();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
          { prescriptions: [ 'ACEPHEN', 'ABILIFY' ]}
      );

      scope.removePrescription(1);
      expect(scope.prescriptions).toEqual([
          {value: 'ACEPHEN'},
          {value: ''}
      ]);

      scope.updateSearchParameters();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
          { prescriptions: [ 'ACEPHEN' ]}
      );

      scope.removePrescription(0);
      expect(scope.prescriptions).toEqual([
          {value: ''}
      ]);

      scope.updateSearchParameters();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
          { prescriptions: [ ]}
      );
  });
});
