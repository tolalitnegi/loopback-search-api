app.service('cartjson', function($http,$log){
	this.cartItems = function() {
		//$http.get("http://jsonp.afeld.me/?url=https://api.myjson.com/bins/19ynm&callback=callbackFN")
		return $http.get("JS/cart.json")
		.then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			//$log.info(response.data.productsInCart);
			return response.data.productsInCart;
		},function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			//$log.warn("Cannot connect to the server" + response);
		});
	}
});