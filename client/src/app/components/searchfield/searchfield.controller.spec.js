'use strict';

describe('ads.searchfield', function(){
  var controller;
  var location;
  var http;
  var httpBackend;
  var httpRequest;
  var searchFieldController;
  var scope;
  var timeout;
  var rootScope;

  beforeEach(module('ads.searchfield'));

  beforeEach(inject(function($controller, $http, $httpBackend, $location, $rootScope, $timeout) {
    controller = $controller;
    http = $http;
    httpBackend = $httpBackend;
    location = $location;
    scope = $rootScope.$new();
    rootScope = $rootScope;
    timeout = $timeout;

    httpRequest = $httpBackend.when('GET', '/assets/brand_names.json')
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

    searchFieldController = $controller('SearchfieldCtrl', { $scope: scope, $rootScope: $rootScope, $http: $http, $location: $location, $timeout: $timeout});

    $httpBackend.flush();
  }));

  it('Proper brand name fetch', function() {
      spyOn(rootScope, '$broadcast');

      expect(scope.brandNames.length).toEqual(25);
  });

  it('Initial empty prescription list', function() {
      spyOn(rootScope, '$broadcast');

      expect(scope.prescriptions).toEqual([
          {value: ''}
      ]);

      expect(scope.searchfieldError).toEqual('');
  });

  it('Invalid loading of prescription list', function() {
      httpRequest.respond(404, 'Error');

      searchFieldController = controller('SearchfieldCtrl', { $scope: scope, $rootScope: rootScope, $http: http, location: location, $timeout: timeout});

      httpBackend.flush();

      expect(scope.searchfieldError).not.toEqual('');
  });

  it('Validate query parameter functionality', function() {
      spyOn(rootScope, '$broadcast');
      spyOn(location, 'search').and.returnValue({
          drugname: 'XOPENEX'
      });

      searchFieldController = controller('SearchfieldCtrl', { $scope: scope, $rootScope: rootScope, $http: http, $location: location, $timeout: timeout});

      expect(scope.prescriptions).toEqual([
          {value: 'XOPENEX'},
          {value: ''}
      ]);

      timeout.flush();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
        { serious: false, prescriptions: [ 'XOPENEX' ]}
      );
  });

  it('Prescription validations', function() {
      scope.prescriptions[0].value = undefined;
      scope.validatePrescription(0);
      expect(scope.prescriptions[0].value).toEqual('');

      scope.prescriptions[0].value = 'notempty';
      scope.validatePrescription(0);
      expect(scope.prescriptions[0].value).not.toEqual('');

  });

  it('Adding a prescription to empty prescription list', function() {
      spyOn(rootScope, '$broadcast');

      scope.prescriptions[0].value = 'ACEPHEN';
      scope.$digest();

      expect(scope.prescriptions).toEqual([
          {value: 'ACEPHEN'},
          {value: ''}
      ]);

      scope.updateSearchParameters();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
        { serious: false, prescriptions: [ 'ACEPHEN' ]}
      );
  });

  it('Adding a prescription to existing prescription list', function() {
      spyOn(rootScope, '$broadcast');

      scope.prescriptions[0].value = 'ACEPHEN';
      scope.$digest();

      expect(scope.prescriptions).toEqual([
          {value: 'ACEPHEN'},
          {value: ''}
      ]);

      scope.updateSearchParameters();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
        { serious: false, prescriptions: [ 'ACEPHEN' ]}
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
          { serious: false, prescriptions: [ 'ACEPHEN', 'ABILIFY' ]}
      );
  });

  it('Removing a prescription to existing prescription list', function() {
      spyOn(rootScope, '$broadcast');

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
          { serious: false, prescriptions: [ 'ACEPHEN', 'ABILIFY' ]}
      );

      scope.removePrescription(1);
      expect(scope.prescriptions).toEqual([
          {value: 'ACEPHEN'},
          {value: ''}
      ]);

      scope.updateSearchParameters();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
          { serious: false, prescriptions: [ 'ACEPHEN' ]}
      );

      scope.removePrescription(0);
      expect(scope.prescriptions).toEqual([
          {value: ''}
      ]);

      scope.updateSearchParameters();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
          { serious: false, prescriptions: [ ]}
      );
  });

  it('Selecting serious adverse events', function() {
      spyOn(rootScope, '$broadcast');

      scope.prescriptions[0].value = 'ACEPHEN';
      scope.$digest();

      expect(scope.prescriptions).toEqual([
          {value: 'ACEPHEN'},
          {value: ''}
      ]);

      scope.serious = true;
      scope.$digest();

      scope.updateSearchParameters();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
          { serious: true, prescriptions: [ 'ACEPHEN' ]}
      );

      scope.serious = false;
      scope.$digest();

      scope.updateSearchParameters();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
          { serious: false, prescriptions: [ 'ACEPHEN' ]}
      );
  });
  
  it('Verifies clearAllEnable is set as expected', function() {
	  expect(scope.clearAllEnabled).toBeFalsy();
	  
      scope.prescriptions[0].value = 'ACEPHEN';
      scope.$digest();

      expect(scope.prescriptions).toEqual([
          {value: 'ACEPHEN'},
          {value: ''}
      ]);

      expect(scope.clearAllEnabled).toBeTruthy();
  });

  it('Verifies removeAllPrescriptions', function() {
      spyOn(rootScope, '$broadcast');
	  expect(scope.clearAllEnabled).toBeFalsy();
	  
      scope.prescriptions[0].value = 'ACEPHEN';
      scope.$digest();

      expect(scope.prescriptions).toEqual([
          {value: 'ACEPHEN'},
          {value: ''}
      ]);
      expect(scope.clearAllEnabled).toBeTruthy();
      
      scope.serious = true;
      scope.$digest();
      
      scope.removeAllPrescriptions();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
          { serious: true, prescriptions: [ ]}
      );
      expect(scope.prescriptions).toEqual( [{value: ''}] );
      expect(scope.clearAllEnabled).toBeFalsy();

      
  });
});
