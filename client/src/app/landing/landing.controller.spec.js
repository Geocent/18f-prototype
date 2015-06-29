'use strict';

describe('controllers', function(){
  var landingController;

  var controller;
  var httpBackend;
  var httpRequest;
  var location;
  var scope;

  beforeEach(module('ads.landing'));

  beforeEach(inject(function($controller, $http, $httpBackend, $location, $rootScope) {
    controller = $controller;
    httpBackend = $httpBackend;
    location = $location;

    scope = $rootScope.$new();

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

    landingController = $controller('LandingCtrl', { $scope: scope, $rootScope: $rootScope, $http: $http, $location: $location });

    $httpBackend.flush();
  }));

  it('Proper brand name fetch', function() {
      expect(scope.brandNames.length).toEqual(25);
  });

  it('Invalid loading of prescription list', function() {
      httpRequest.respond(404, 'Error');

      landingController = controller('LandingCtrl', { $scope: scope });

      httpBackend.flush();

      expect(scope.landingError).not.toEqual('');
  });

  it('Prescription validations', function() {
      scope.drug.value = undefined;
      scope.validatePrescription();
      expect(scope.drug).toEqual('');

      scope.drug = 'notempty';
      scope.validatePrescription();
      expect(scope.drug).not.toEqual('');
  });

  it('Validate drug search request', function(){
      spyOn(location, 'url');

      scope.drug = 'XOPENEX';
      scope.searchDrug();

      expect(location.url).toHaveBeenCalledWith('/search?drugname=XOPENEX');

  });
});
