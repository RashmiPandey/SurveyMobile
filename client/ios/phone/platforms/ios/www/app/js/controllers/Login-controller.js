/**
 * Login Controller is used to check whether the given input is right or wrong
 * in DB.
 * 
 */
(function() {
	/*var app = angular.module('Sloan_test_1');*/
	app.controller('LoginController', [ '$rootScope', 
	                                    '$scope', 
	                                    '$http', 
	                                    '$location', 
	                                    '$log', 
	                                    '$timeout', 
	                                    function($rootScope, $scope, $http, $location, $log, $timeout) {

		$log.log("Inside the Login Controller");

		$scope.userDetails = {};

		$scope.signUpLocation = function(){
			console.log('Inside The signUpLocation()')
			$location.url('/en-US/signup/');
		}
		
		$scope.doLogin = function(loginform,userDetails) {
			$log.log("Inside the doLogin()");
			if (loginform.$valid) {
				if (userDetails.email != null || userDetails.email != "" && userDetails.passWord != null || userDetails.passWord != "") {
					//var login = "http://localhost:8080/sloan_test/login/loginValidation"
					var login = "http://45.55.156.148:8080/sloan_test/login/loginValidation"
					$log.log("Inside the doLogin() Details cheking",angular.toJson(userDetails));
					
					$http({
						url : login,
						method:"POST",
						data :angular.toJson($scope.userDetails),
						headers : {
							"content-type":"application/json",
					        'Accept': 'application/json'
						}
					}).success (function(data) {
							if(data.responseSuccess == "success"){
								$log.log("User SuccessFully Logged In ",angular.toJson( data));
								alert("Login Success");
							}
							else if(data.responseError == "error"){
								$log.log("Invalid Logged In ",angular.toJson( data));
								alert("Invalid Login");
							}
						}).error(function(data) {
							$log.log("Internal Server Error", angular.toJson( data));
					});	
				}
			} else {
				alert('You must Enter all the field')
			}
		}
	} ]); 

})(); 
