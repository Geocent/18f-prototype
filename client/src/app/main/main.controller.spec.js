'use strict';

describe('controllers', function(){
  var scope;
  var rootScope;

  var mainController;

  beforeEach(module('ads.main'));

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    rootScope = $rootScope;

    spyOn(rootScope, '$broadcast').and.callThrough();

    mainController = $controller('MainCtrl', { $scope: scope, $rootScope: $rootScope});
  }));

  it('Test for main controller functionality', function() {
      rootScope.$broadcast('updateSearchParameters', {
          serious: true,
          prescriptions: ['A', 'B', 'C']
      });

      expect(rootScope.$broadcast).toHaveBeenCalledWith('updateSearchParameters',
        {
            serious: true,
            prescriptions: [ 'A', 'B', 'C' ]
        });

      expect(scope.displayResultSections).toBe(true);
  });
});
