/**
 * Created by Henrikh on 2/21/16.
 */

app.controller('ApplicationLevel', ['$scope', '$state', '$http', 'RestURL', 'Settings',
    function ($scope, $state, $http, RestURL, Settings) {

        //if (Settings.global.user.loggedIn) {
		if(true){
            $state.go('profile');
        } else $state.go('profile');

    }]);