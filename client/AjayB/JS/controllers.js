app.controller('shoppingBag', function($log,cartjson,$scope,$rootScope){
	cartjson.cartItems().then(function(response){
        $scope.cartProducts = response;
    	$log.info($scope.cartProducts);
		$scope.pageheading = "your shopping bag";
		$scope.numberofItems = $scope.cartProducts.length;
		$scope.couponCode = "";
		$scope.couponApplied = false;
		$scope.couponVal = 9.00;
		$scope.subtotal = 0.00;
				
		angular.forEach($scope.cartProducts, function(val,key){
			$scope.subtotal = $scope.subtotal + val.p_price;
		});
		$scope.total = $scope.subtotal;
		
		$scope.applycoupon = function(){
			if($scope.couponCode){
				$log.info("coupon true");
				$scope.couponApplied = true;
				$scope._couponCode = $scope.couponCode;
				$scope.total = $scope.subtotal - $scope.couponVal;	
				//return true;
			}
			else{
				$log.info("coupon false");
				$scope.couponApplied = false;
				$scope.total = $scope.subtotal;
				//return false;
			}
		}
		
		$scope.modalShown = false;
		$scope.toggleModal = function(x) {
			$log.info(x);
			$scope.modalShown = !$scope.modalShown;
			$scope.prod_name = x.p_name;
			$scope.colors = x.p_available_options.colors;
			$scope.sizes = x.p_available_options.sizes;
			$scope.qtys = ["QTY:1","QTY:2","QTY:3","QTY:4","QTY:5"];
		};
		
		$scope.checkout = function(){
			$log.info("checkout");
		}
	});
});