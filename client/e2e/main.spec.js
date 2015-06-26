'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
    page = require('./main.po');
  });

  describe('Default page load', function() {
      it('Verify input fields', function() {
          expect(element.all(by.css('.nya-bs-select')).count()).toEqual(1);
      });
  });

  // describe('Perform valid queries', function() {
  //     it('should filter results', function() {
  //       element(by.css('.prescription')).sendKeys('h').then(function() {
  //           expect(element.all(by.repeater('match in matches')).count()).toEqual(10);
  //       }, 200);
  //     });
  // });
  //
  // describe('Perform invalid queries', function() {
  //     it('should filter results', function() {
  //       element(by.css('.prescription')).sendKeys('zyzzyx').then(function() {
  //           expect(element.all(by.repeater('match in matches')).count()).toEqual(0);
  //       }, 200);
  //     });
  // });
});
