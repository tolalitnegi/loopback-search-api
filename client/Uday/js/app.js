'use strict';

/* App Module */
var shoppingBagApp = angular.module('shoppingBagApp', ['ngRoute','shopingBagControllers','shopingBagServices']);

shoppingBagApp.config(['$routeProvider',  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'shoppingListCtrl'
      })
  }]);
  
  