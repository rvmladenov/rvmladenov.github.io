'use strict';

var adsApp = angular.module('adsProjectAngularJsApp', [
    'ngRoute',
    'LocalStorageModule'
  ]);

adsApp
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/404', {
        templateUrl: './404.html'
      })
      .otherwise({
        redirectTo: '/404'
      });

    /**
     * TODO: Found that there is a problem with the new HTML5 Paths when the page is refreshed by the user(the user clicks F5 )
     * Defines the new HTML 5 Paths (i.e. removes the #hashtag from the addressbar)
     */
    //$locationProvider.html5Mode(true);
  })
  .constant('LAYOUT', {
    FOOTER : 'views/layout/footer.html',
    HEADER : 'views/layout/header.html'
  });
