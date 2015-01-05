'use strict';

adsApp.controller('MainCtrl', function ($scope, $route, LAYOUT) {

  /** Layouts definitions */
  $scope.headerLayout = LAYOUT.HEADER;
  $scope.footerLayout = LAYOUT.FOOTER;

  $scope.$route = $route;

  $scope.getPageTitle = function(pathStr){
    var capitalizedTitle = '';

    if(pathStr) {
      var pathArr = pathStr.split('/');
      var title = pathArr[pathArr.length-1].split('.')[0];
      capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    }

    return capitalizedTitle;
  };
});
