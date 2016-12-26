angular.module('mainApp')
    .factory('RegisterUser', ['$http', function ($http) {
        var loginurl = 'http://localhost:3000/api/register';

        return function (userData, password) {
            userData.password = password;

            var req = {
                method: 'POST',
                url: loginurl,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: userData
            }

            return $http(req)
                .then(function(response) {
                    return response.data;
                }, function (error) {
                    return error.data;
                });
        };
    }]);