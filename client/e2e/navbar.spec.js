'use strict'

describe('main navigation tabs', function () {

  var navbar = require('./navbar.po');

  it('should navigate from home to about', function () {
    navbar.loadHomepage();
    navbar.clickAbout();
    expect(navbar.getActiveTabText()).toEqual('About');
  });

  it('should navigate from home to contact', function () {
    navbar.loadHomepage();
    navbar.clickContact();
    expect(navbar.getActiveTabText()).toEqual('Contact');
  });
});
