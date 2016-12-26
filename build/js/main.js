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
angular.module('mainApp')
    .factory('RegisterModel', ['RegisterUser', function (RegisterUser) {
        function User(obj) {
            this.forename = obj.forename || '';
            this.surname = obj.surname || '';
            this.sex = obj.sex || '';
            this.dob = obj.dob || null;
            this.email = obj.email || '';
            this.verifyEmail = obj.verifyEmail || '';
        }

        User.prototype = {
            //to check if password has minimum length
            isValidPassword: function (password) {
                return checkMinimumPassword(password);
            },
            compareEmail: function () {
                if (this.email && this.verifyEmail)
                    return this.email === this.verifyEmail;
                else
                    return false;
            },
            register: function (password) {
                return RegisterUser(this, password);
            }
        }

        function checkMinimumPassword(password) {
            var hasUpperCase = false, hasNumber = false;
            if (password.length >= 7 && password.length <= 25) {
                var i = 0, char;
                while (i < password.length) {
                    char = password.charAt(i);
                    if (/[A-Z]/.test(char)) hasUpperCase = true;
                    if (/[0-9]/.test(char)) hasNumber = true;

                    if (hasUpperCase && hasNumber) return true;

                    i++;
                }
                return false;
            } else
                return false;
        }

        return User;

    }]);

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
angular.module('mainApp')
    .controller('loginCtrl', ['$scope', '$location', '$anchorScroll', '$window', 'LoginModel',
        function ($scope, $location, $anchorScroll, $window, LoginModel) {
            //intialize user with empty object
            var user = new LoginModel();
            $scope.userLogin = user;

            $scope.Login = function () {
                var username = $scope.userLogin.username;
                var password = $scope.userLogin.password;

                //check if input is valid
                if (!validate()) return;

                //check password has required number of charaters
                if (user.isValidPassword(password)) {
                    //check username and password are correct
                    user.checkValidity(username, password)
                        .then(function (message) {
                            $scope.loginMessage = message;
                        });
                } else {
                    //show message if validation fails
                    $scope.message = {
                        success: false,
                        info: 'Password should be minimum 7 characters.',
                        notification: 'Oops!',
                        errorInfo: 'Go to error.',
                        errorElement: 'password'
                    }
                }
            }

            //close Message Box
            $scope.CloseMessage = function () {
                $scope.message = null;
            }

            //scroll to id and set focus on element with id
            $scope.GoTo = function (id) {
                $location.hash(id);
                $anchorScroll();
                var element = $window.document.getElementById(id);
                if (element)
                    element.focus();
                $location.hash(null);
            }

            //redirect to registration page
            $scope.GotoRegister = function () {
                $location.path('/register');
            }

            //validate input for invalid or empty entry
            function validate() {
                var firstError = null;
                var isvalid = true;

                if (!$scope.userLogin.username) {
                    $scope.userLogin.usernameInvalid = true;
                    isvalid = false;
                    firstError = 'username';
                } else {
                    $scope.userLogin.usernameInvalid = false;
                }

                if (!$scope.userLogin.password) {
                    $scope.userLogin.passwordInvalid = true;
                    isvalid = false;
                    if (!firstError) firstError = 'password';
                } else {
                    $scope.userLogin.passwordInvalid = false;
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
    .controller('registerCtrl', ['$scope', '$location', '$anchorScroll', '$window', 'RegisterModel',
        function ($scope, $location, $anchorScroll, $window, RegisterModel) {
            //intialize user with empty object
            $scope.user = {};
            $scope.user.sex = "";

            $scope.Register = function () {
                //check inputs are valid
                if (!validate()) return;

                //create registerModel object
                var reg = new RegisterModel($scope.user);
                var valid = true;//flag for validating user with reg prototype

                //check email and verifyEmail are same
                if (!reg.compareEmail()) {
                    $scope.user.emailInvalid = true;
                    $scope.user.verifyEmailInvalid = true;
                    setMessageBox(
                        false,
                        'Email and verify email should be same.',
                        'Hmmm!',
                        'Go to error.',
                        'email');
                    valid = false;
                } else {
                    $scope.user.emailInvalid = false;
                    $scope.user.verifyEmailInvalid = false;
                    
                }

                //check password meets minimum requirements
                if (!reg.isValidPassword($scope.user.password)) {
                    $scope.user.passwordInvalid = true;
                    //set only if other inputs are valid
                    if (valid) {
                        valid = false;
                        setMessageBox(
                            false,
                            'Password should be minimum 7 characters. At least one uppercase character. At least one number.',
                            'Oops!',
                            'Go to error.',
                            'password');
                    }
                } else {
                    $scope.user.passwordInvalid = false;
                }

                //continue only if all inputs are valid
                if (!valid) return;

                //register user data
                reg.register($scope.user.password).then(function(success) {
                    $location.path('/home');
                }, function(error) {
                    
                });
            }

            //close Message Box
            $scope.CloseMessage = function () {
                $scope.message = null;
            }

            //scroll to id and set focus on element with id
            $scope.GoTo = function (id) {
                $location.hash(id);
                $anchorScroll();
                var element = $window.document.getElementById(id);
                if (element)
                    element.focus();
                $location.hash(null);
            }

            //redirect to login page
            $scope.GotoLogin = function () {
                $location.path('/login');
            }

            //validate input for invalid or empty entry
            function validate() {
                var firstError = null;
                var isvalid = true;

                if (!$scope.user.forename) {
                    $scope.user.forenameInvalid = true;
                    isvalid = false;
                    firstError = 'forename';
                } else {
                    $scope.user.forenameInvalid = false;
                }

                if (!$scope.user.surname) {
                    $scope.user.surnameInvalid = true;
                    isvalid = false;
                    if (!firstError) firstError = 'surname';
                } else {
                    $scope.user.surnameInvalid = false;
                }

                if (!$scope.user.sex) {
                    $scope.user.sexInvalid = true;
                    isvalid = false;
                    if (!firstError) firstError = 'sex';
                } else {
                    $scope.user.sexInvalid = false;
                }

                //if (!$scope.user.dob) {
                //    $scope.user.dobInvalid = true;
                //    isvalid = false;
                //    if (!firstError) firstError = 'dob';
                //} else {
                //    $scope.user.dobInvalid = false;
                //}

                if (!$scope.user.email) {
                    $scope.user.emailInvalid = true;
                    isvalid = false;
                    if (!firstError) firstError = 'email';
                } else {
                    $scope.user.emailInvalid = false;
                }

                if (!$scope.user.verifyEmail) {
                    $scope.user.verifyEmailInvalid = true;
                    isvalid = false;
                    if (!firstError) firstError = 'verify-email';
                } else {
                    $scope.user.verifyEmailInvalid = false;
                }

                if (!$scope.user.password) {
                    $scope.user.passwordInvalid = true;
                    isvalid = false;
                    if (!firstError) firstError = 'password';
                } else {
                    $scope.user.passwordInvalid = false;
                }
                
                if (!isvalid) {
                    setMessageBox(
                        false,
                        'Looks like you need to adjust few things.',
                        'Oh Snap!',
                        'Go to first error.',
                        firstError);
                }

                return isvalid;
            }

            //to set Message Box
            function setMessageBox(success, info, notification, errorinfo, element) {
                $scope.message = {
                    success: success,
                    info: info,
                    notification: notification,
                    errorInfo: errorinfo,
                    errorElement: element
                }
                //scroll to message-box
                $location.hash('message-box');
                $anchorScroll();
                $location.hash(null);//to prevent url change
            }
        }]);

})();