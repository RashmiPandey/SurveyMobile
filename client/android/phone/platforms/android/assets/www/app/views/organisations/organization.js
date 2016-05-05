/**
 * Created by Henrikh on 1/13/16.
 */

app.controller('IntroController', ['$scope', '$location', '$http', 'RestURL', 'Settings',
    function ($scope, $location, $http, RestURL, Settings) {

    var self = $scope;
    self.organization = '';

    $http.get(RestURL.baseURL + 'sloan_test/organization/getAllOrg/')
        .success(function (response) {
            self.organizations = response;
            self.organizations = [
              {
                organisationName: 'Kappa Alpha Theta'
              },
              {
                organisationName: 'Alpha Omicron Pi'
              },
              {
                organisationName: 'Delta Tau Delta'
              },
              {
                organisationName: 'Kappa Sigma'
              }
            ];
        })
        .error(function (error) {
            console.warn(error);
        });


    self.submit = function () {
        if (self.organization) {
            Settings.global.organization = self.organization;

            //$http.post(RestURL.baseURL + '')
            //    .success(function (response) {
            //        console.log(response);
            //    })
            //    .error(function (error) {
            //        console.warn(error);
            //    });

            $location.url('/en-US/user/profile/');
        }

        return false;
    };
}]);
