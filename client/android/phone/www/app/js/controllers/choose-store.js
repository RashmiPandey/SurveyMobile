/**
 *
 * @author Schubert Generated Code</br>
 * Date Created: </br>
 * @since  </br>
 build:   </p>
 *
 * code was generated by the Schubert System </br>
 * Schubert system Copyright - NewPortBay LLC copy_right_range</br>
 * The generated code is free to use by anyone</p>
 *
 *
 *
 */

app.controller('choose_store', ['$scope', '$rootScope', '$location', '$state', '$window', '$q', '$http', '$ionicPopup', 'RestURL', 'Settings', 'surveyService','$timeout','surveyFactory',
    function ($scope, $rootScope, $location, $state, $window, $q, $http, $ionicPopup, RestURL, Settings, surveyService,$timeout,surveyFactory) {
        var self = $scope;
        self.storeList ={};
        self.init = function(){
           console.log("--------In Store");
         // self.storeList= surveyFactory.getStores();
           self.storeList= surveyService.routesList;
           console.log("-------------choose Store value----"+angular.toJson(self.storeList));
        };
        self.init();
}]);