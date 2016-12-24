angular.module('mainApp')
    //.factory('UserModel', ['loginResource', function (loginResource) {
    .factory('LoginModel', [function () {
        
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
                that.isValid = username === 'foo' && password === 'something';
                return that.isValid;
            }
        };

        return User;
    }]);