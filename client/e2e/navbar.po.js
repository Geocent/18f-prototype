'use strict'

var Navbar = function() {

  var activeLAnchor;
  var navbarDiv = element(by.css('.navbar-collapse'));
  var navbarListItems = navbarDiv.all(by.css('ul > li'));
  var activeLAnchor = navbarDiv.element(by.css('ul > li.active > a'));

  this.loadHomePageInBrowser = function() {
    browser.get('http://localhost:3000/index.html');
  }

  this.loadAboutPageInBrowser = function() {
    browser.get('http://localhost:3000/#/about');
  }

  this.clickHome = function() {
    var homeIndex = 0;
    clickTabBy(homeIndex);
  }

  this.clickAbout = function() {
    var aboutIndex = 1;
    clickTabBy(aboutIndex);
  }

  this.clickContact = function() {
    var contactIndex = 2;
    clickTabBy(contactIndex);
  }

  this.getActiveTabText = function() {
    return activeLAnchor.getText();
  }

  function clickTabBy(index) {
    var tabListItem = navbarListItems.get(index);
    var tabAnchor = tabListItem.element(by.css('a'));
    tabAnchor.click();
  }
};

module.exports = new Navbar();
