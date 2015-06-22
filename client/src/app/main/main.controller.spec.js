'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('ads.main'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));
});
