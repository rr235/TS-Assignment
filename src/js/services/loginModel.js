angular.module('mainApp')
    .factory('LoginModel', ['AuthenticateUser', function (AuthenticateUser) {

        //constructor fot instantiating User
        function User() {
        }

        //set protoype to inlcude necessary functions
        User.prototype = {
            //to check if password has minimum length
            isValidPassword: function (password) {
                return password.length >= 7 && password.length <= 25;
            },
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