 
(function() {
	app.controller('CustomerController', [ '$rootScope', 
	                                    '$scope', 
	                                    '$http', 
	                                    '$location', 
	                                    '$log', 
	                                    '$timeout', 
	                                    'userService',
	                                    function($rootScope, $scope, $http, $location, $log, $timeout,userService) {

		$log.log("Inside the SignUp Controller");

		$scope.CustomerDetails = {
				details:'',
				gender:'',
				name:'',
				user:''
		};

		$scope.SaveCustomer = function(customerForm,CustomerDetails) {
			$log.log("Inside the customer Details controller");
			if (customerForm.$valid) {
				if (CustomerDetails.details != null || CustomerDetails.details != "" &&  
						CustomerDetails.gender != null || CustomerDetails.gender != "" &&
						CustomerDetails.name != null || CustomerDetails.name != "") {
					//var customer = "http://localhost:8080/sloan_test/customer/create"
					var customer = "http://45.55.156.148:8080/sloan_test/customer/create"
						
					$log.log("Inside the customer Details checking",angular.toJson(CustomerDetails));
					$scope.CustomerDetails.user=userService.UserObject;
					console.log("Objectv to persits---",angular.toJson($scope.CustomerDetails));
					
					$http({
						method:"POST",
						url : customer,
						data :$scope.CustomerDetails,
						headers : {
							"content-type":"application/json",
					        'Accept': 'application/json'
						}
					}).success (function(data) {
							$log.log("customer created --", data);
							$location.url('/en-US/login');
						 
						})
						.error(function(data) {
							console.log("angu ---date of customer  error---",angular.toJson(data));
							$log.log("can't create a customer", data);
					});	
				}
			} else {
				alert('You must Enter all the field')
			}
		}
	} ]);// Controller Ends

})();// function ends
