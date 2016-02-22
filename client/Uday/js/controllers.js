'use strict';

/* Controllers */

var shopingBagControllers = angular.module('shopingBagControllers', []);

shopingBagControllers.controller('shoppingListCtrl', ['$scope', 'shoppingItems', function($scope, shoppingItems) {
	shoppingItems.async().then(function(response) {
		$scope.productsInCart = response.data.productsInCart;
		//console.log($scope.productsInCart)
	}); 
	
	$scope.subTotalAmt;
	$scope.discountAmt;
	$scope.totalQuantity;
	$scope.discountP;
	$scope.grandTotal;
	$scope.promoCode = 7;
	
	$scope.removeItem = function(index) {
        $scope.productsInCart.splice(index, 1);
    }
	
	$scope.subTotal = function() {
        $scope.subTotalAmt = 0;
		$scope.totalQuantity = 0;
        angular.forEach($scope.productsInCart, function(product) {
			$scope.totalQuantity+=parseInt(product.p_quantity);
            $scope.subTotalAmt+= parseInt(product.p_quantity) * product.p_price;
        })
        return $scope.subTotalAmt;
    }
	
	$scope.discount = function() {
        $scope.discountP=0
		$scope.discountAmt = 0;
		if ($scope.totalQuantity == 3){$scope.discountP = 5;}
		if ($scope.totalQuantity > 3 && $scope.totalQuantity <=10){$scope.discountP = 10;}
		if ($scope.totalQuantity > 10){$scope.discountP = 25;}
		$scope.discountAmt = ($scope.subTotalAmt*$scope.discountP)/100;
		return $scope.discountAmt
    }
	
	$scope.total = function() {
        $scope.grandTotal = 0;
        $scope.grandTotal = $scope.subTotalAmt - $scope.discountAmt - $scope.promoCode;
        return $scope.grandTotal;
    }	
	
	//Modal
	$scope.showModal = false;
    $scope.toggleModal = function($index){
        $scope.showModal = !$scope.showModal;
    };
	
}]);

//Modal Directive
shopingBagControllers.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;		
		scope.name= "test";		
		console.log(attrs);
		
        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
			
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
  
  //VAlidate the item Quantity
  shopingBagControllers.directive('validNumber', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return; 
      }
      
      ngModelCtrl.$parsers.push(function(val) {
        var clean = val.replace( /[^0-9]+/g, '');
        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });
      
      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});