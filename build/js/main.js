'use strict';
(function () {

var mainapp = angular.module('mainApp', ['ngRoute']);

mainapp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    //Add this in case of angular 1.6 
    //in ang1.6 # is explecting a bang(!) in the route
    //so in ang1.6 Eg: abc.com/#!/login instead of abc.com/#/login in ang1.5
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/login',
        {
            templateUrl: 'templates/login.tpl.html',
            controller: 'loginCtrl'
        })
        .when('/register',
        {
            templateUrl: 'templates/register.tpl.html',
            controller: 'registerCtrl'
        })
        .when('/home',
        {
            templateUrl: 'templates/home.tpl.html'
        })
        .otherwise({ redirectTo: '/login' });

}]);


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
angular.module('mainApp')
    .factory('loginResource', [function() {
        
    }]);
angular.module('mainApp')
    .controller('loginCtrl', ['$scope', '$location', '$anchorScroll', '$window', 'LoginModel',
        function ($scope, $location, $anchorScroll, $window, LoginModel) {
            var user = new LoginModel();
            $scope.userLogin = user;

            $scope.Login = function () {
                var username = $scope.userLogin.username;
                var password = $scope.userLogin.password;

                //check if input is valid
                if (!validate()) return;

                //check password has required number of charaters
                if (user.isValidPassword(password)) {
                    if (!user.checkValidity(username, password))
                        $scope.loginMessage = "Invalid username or password.";
                    else {
                        $scope.loginMessage = "";
                        $location.path('/home');
                    }
                } else {
                    $scope.message = {
                        success: false,
                        info: 'Password should be minimum 7 characters.',
                        notification: 'Oops!',
                        errorInfo: 'Go to error.',
                        errorElement: 'password'
                    }
                }
            }

            $scope.CloseMessage = function () {
                $scope.message = null;
            }

            $scope.GoTo = function (id) {
                $location.hash(id);
                $anchorScroll();
                var element = $window.document.getElementById(id);
                if (element)
                    element.focus();
            }

            function validate() {
                var firstError = null;
                var isvalid = true;

                if (!$scope.userLogin.username) {
                    $scope.userLogin.usernameInvalid = true;
                    isvalid = false;
                    firstError = 'username';
                }
                if (!$scope.userLogin.password) {
                    $scope.userLogin.passwordInvalid = true;
                    isvalid = false;
                    if (!firstError) firstError = 'password';
                }

                if (!isvalid) {
                    $scope.message = {
                        success: false,
                        info: 'Looks like you need to adjust few things.',
                        notification: 'Oh Snap!',
                        errorInfo: 'Go to first error.',
                        errorElement: firstError
                    }
                }

                return isvalid;
            }
        }]);
angular.module('mainApp')
    .controller('menuCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.isActive = function (path) {
            return $location.path() === path;
        }
    }]);
angular.module('mainApp')
    .controller('registerCtrl', ['$scope', function($scope) {
        
    }]);

})();