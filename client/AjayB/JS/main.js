var app = angular.module("dictionaryBible", ['ionic']);
	
	app.controller("titles", function($scope){
		$scope.title = "Easton's Bible Dictionary";
		$scope.subtitle = "Search for any word from the Bible";
	});
	
	app.controller("footnote", function($scope){
		$scope.footnote = "Thank you for using our app";
	});
	
	app.controller("dictCntrl", function($scope, $http, $log) {//set scope and dependency on http service
		$scope.sharenote = "Share with friends";
		$scope.validationError = "SPlease try a different search";
		$scope.getJSON = function(x,y){//pass the selected word
			$log.info(y);
			$scope.firstPart = "eastonsAtoF";
			$scope.secondPart = "eastonsGtoO";
			$scope.thirdPart = "eastonsPtoZ";
			//clearing all models
			$scope.wordDescLines = [];
			$scope.searchedWord = "";
			if(x && /[A-F]/.test(x[0].toUpperCase())){//read the first letter and check what part of JSON to be loaded
				$http.get("json/eastonsAtoF.json")//request json data
				.then(function(response){
					$scope.sample("eastonsAtoF",response);
				});
			}
			else if(x && /[G-O]/.test(x[0].toUpperCase())){
				$http.get("json/eastonsGtoO.json")//request json data
				.then(function(response){
					$scope.sample("eastonsGtoO",response);
				});
			}
			else if(x && /[P-Z]/.test(x[0].toUpperCase())){
				$http.get("json/eastonsPtoZ.json")//request json data
				.then(function(response){
					$scope.sample("eastonsPtoZ",response);	
				});
			}
			else{
				$scope.allWordsArray = [];
			}
			
			$scope.sample = function(file,response){
				if(file=="eastonsAtoF"){
					$scope.words = response.data.eastonsAtoF;//set returned data in to a variable/object
				}	
				else if(file=="eastonsGtoO"){
					$scope.words = response.data.eastonsGtoO;//set returned data in to a variable/object
				}
				else if(file=="eastonsPtoZ"){
					$scope.words = response.data.eastonsPtoZ;//set returned data in to a variable/object
				}
				$scope.allWordsArray = Object.keys($scope.words);//iterate through keys and set as an array (for filtering purpose)
						/* angular.forEach($scope.allWordsArray, function(value, index) {
						  if(value.toLowerCase().indexOf(x.toLowerCase())== -1){
							$log.warn("not present");
						  }
						  else{
							  $log.warn("present");
						  }
						}); */
			}
			$scope.searchFor = function(keyAsWord) {//search for results (vaue of the key from words object)
				keyAsWord = keyAsWord[0].toUpperCase()+keyAsWord.slice(1);
				$scope.searchWord=null;//hide the list below txt box
				$scope.wordDescLines = $scope.words[keyAsWord]; //ressult is an array of objects (each object has statement and refrence as keys)
				$scope.searchedWord = keyAsWord;
			}
			if(y==13){
				//window.activeElement.blur();
				$scope.searchFor($scope.searchWord);
			}
		}
		$scope.sharesocial = function(){
			window.plugins.socialsharing.share($scope.searchedWord+":	"+resArr);
		}
	});	
	app.run(function($ionicPlatform) {
	  $ionicPlatform.ready(function() {
		//navigator.splashscreen.hide();
		if(window.cordova && window.cordova.plugins.Keyboard) {
		  // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		  // for form inputs)
		  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

		  // Don't remove this line unless you know what you are doing. It stops the viewport
		  // from snapping when text inputs are focused. Ionic handles this internally for
		  // a much nicer keyboard experience.
		  cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) {
		  StatusBar.styleDefault();
		}
	  });
	});
	
