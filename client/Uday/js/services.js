'use strict';

/* Services */

var shopingBagServices = angular.module('shopingBagServices', ['ngResource']);

shopingBagServices.factory('shoppingItems', ['$http', function($http){    
	return {
		async: function() {
		  return $http.get('http://jsonp.afeld.me/?url=https://api.myjson.com/bins/19ynm');
		}
	};
}]);