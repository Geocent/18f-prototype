'use strict';

angular.module('client',
  ['ngAnimate', 'ngCookies', 'ngTouch',
   'ngSanitize', 'ngResource', 'ui.router',
   'ui.bootstrap', 'ads.navbar', 'ads.main', 'ads.landing',
    'ads.searchfield', 'ads.chartControllers','ads.datachart','ads.piechart']
)
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/landing/landing.html',
        controller: 'LandingCtrl'
      })
      .state('search', {
        url: '/search',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('eventsChart', {
        url: '/eventsChart',
        templateUrl: 'app/components/barchart/bar-chart.html',
        controller: 'BarChartCtrl',
        controllerAs: 'barChartCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/views/about/about.html'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'app/views/contact/contact.html'
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('apiKey', 'PMu2VWNEL2toIOjWKmlJ40RGeClZsO3Ey7IacRLo')
  .constant('fdaApiUrl', 'https://api.fda.gov')
;
