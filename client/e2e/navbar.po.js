'use strict'

var Navbar = function() {

  var activeLAnchor;
  var navbarDiv = element(by.css('#bs-example-navbar-collapse-6'));
  var navbarListItems = navbarDiv.all(by.css('ul > li'));
  var activeLAnchor = navbarDiv.element(by.css('ul > li.active > a'));

  this.loadHomepage = function() {
    browser.get('http://localhost:3000/index.html');
  }

  this.clickAbout = function() {
    var aboutListItem = navbarListItems.get(1);
    var aboutAnchor = aboutListItem.element(by.css('a'));
    aboutAnchor.click();
  }

  this.getActiveTabText = function() {
    return activeLAnchor.getText();
  }
};

module.exports = new Navbar();
