angular.module('mainApp')
    .factory('AuthenticateUser', ['$http', function ($http) {
        var loginurl = 'http://localhost:3000/api/login';

        return function (username, password) {
            var req = {
                method: 'POST',
                url: loginurl,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { username: username, password: password }
            }

            return $http(req);
        };
    }]);