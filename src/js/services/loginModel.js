angular.module('mainApp')
    .factory('LoginModel', ['AuthenticateUser', function (AuthenticateUser) {
        //constructor fot instantiating User
        function User() {
        }

        //set protoype to inlcude necessary functions
        User.prototype = {
            //to validate username and password 
            checkValidity: function (username, password) {
                var that = this;
                that.username = username;
                return AuthenticateUser(username, password)
                    .then(function (response) {
                        that.isValid = true;
                        return response.data.message;
                    }, function (error) {
                        that.isValid = false;
                        return error.data.message;
                    });
            }
        };

        return User;
    }]);