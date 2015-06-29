'use strict';

describe('ads.navbar', function(){
    var scope;
    var location;

    beforeEach(module('ads.navbar'));

    beforeEach(inject(function($controller, $location, $rootScope){
        location = $location;
        scope = $rootScope.$new();

        $controller('NavbarCtrl', { $scope: scope, $location: $location });
    }));

    it('isActive tests', function() {
        spyOn(location, 'path').and.returnValue('/testlocation');

        expect(scope.isActive('#/testlocation')).toBe(true);
        expect(scope.isActive('#/')).toBe(false);
        expect(scope.isActive('#/doesnotexist')).toBe(false);
    });
});
