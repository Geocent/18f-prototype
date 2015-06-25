'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('ads.landing'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));
});
