'use strict'

describe('main navigation tabs', function () {

  var navbar = require('./navbar.po');

  it('should navigate from home to about', function () {
    navbar.loadHomePageInBrowser();
    navbar.clickAbout();
    expect(navbar.getActiveTabText()).toEqual('About');
  });

  it('should navigate from home to contact', function () {
    navbar.loadHomePageInBrowser();
    navbar.clickContact();
    expect(navbar.getActiveTabText()).toEqual('Contact');
  });

  it('should navigate from about to search', function () {
    navbar.loadAboutPageInBrowser();
    navbar.clickSearch();
    expect(navbar.getActiveTabText()).toEqual('Search');
  });
});
