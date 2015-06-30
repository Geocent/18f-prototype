'use strict';

describe('The main view', function () {
  var page;
  var navbar;

  beforeEach(function () {
    browser.get('http://localhost:3000/#/search');
    page = require('./main.po');
    navbar = require('./navbar.po');
  });

  describe('Default page load', function() {
      it('Verify input fields', function() {
          navbar.loadHomePageInBrowser();
          navbar.clickSearch();
          expect(element.all(by.css('.prescription')).count()).toEqual(1);
      });
  });

  describe('Perform valid queries', function() {
      it('should filter results', function() {
        navbar.loadHomePageInBrowser();
        navbar.clickSearch();
        element(by.css('.prescription')).sendKeys('h').then(function() {
            expect(element.all(by.repeater('match in matches')).count()).toEqual(10);
        }, 200);
      });
  });

  describe('Perform invalid queries', function() {
      it('should filter results', function() {
        navbar.loadHomePageInBrowser();
        navbar.clickSearch();
        element(by.css('.prescription')).sendKeys('zyzzyx').then(function() {
            expect(element.all(by.repeater('match in matches')).count()).toEqual(0);
        }, 200);
      });
  });
});
