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

        //function checkMinimumPassword(password) {
        //    var hasUpperCase = false, hasNumber = false;
        //    if (password.length >= 7 && password.length <= 25) {
        //        var i = 0, char;
        //        while (i < password.length) {
        //            char = password.charAt(i);
        //            if (/[A-Z]/.test(char)) hasUpperCase = true;
        //            if (/[0-9]/.test(char)) hasNumber = true;

        //            if (hasUpperCase && hasNumber) return true;

        //            i++;
        //        }
        //        return false;
        //    } else
        //        return false;
        //}

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
    .directive('dropdown', ['$document', function ($document) {

        function link(scope, element, attr, ctrl) {
        scope.touched = false;
            scope.options = [
            { name: 'Please Select', value: 'na' },
            { name: 'Male', value: 'm' },
            { name: 'Female', value: 'f' }
            ];
            scope.selectedOption = { name: 'Please Select', value: 'na' };
            scope.showOptions = false;

            
            //show or hide options
            scope.Toggle = function () {
                ctrl.$setTouched();
                scope.touched = true;
                scope.showOptions = !scope.showOptions;
            }

            scope.select = function (option) {
                scope.selectedOption = option;
                scope.showOptions = false;
                scope.selection = option.value;
            }

            ctrl.$validators.select = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) return true;
                
                if (scope.touched && modelValue !== 'na') return true;

                return false;
            };

            //clicked anywhere but here
            var handler = function (event) {
                if (!element[0].contains(event.target)) {
                    scope.$evalAsync(function() {scope.showOptions = false;});
                    
                }
            };

            $document.on('click', handler);
            scope.$on('$destroy', function () {
                $document.off('click', handler);
            });
        }
        return {
            require:'ngModel',
            restrict: 'E',
            scope: {
                selection: '='
            },
            templateUrl: 'templates/dropdown.tpl.html',
            link: link,
            replace: true
        }
    }]);
//JQuery DatePicker directive
angular.module('mainApp')
    .directive('jqdatepicker', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            transclude: false,
            link: function (scope, element, attrs) {
                var modelAccessor = $parse(attrs.ngModel);

                //console.log(modelAccessor);

                var processChange = function () {
                    var date = new Date(element.datepicker("getDate"));

                    scope.$evalAsync(function (scope) {
                        // Change bound variable
                        modelAccessor.assign(scope, date);
                    });
                };

                element.datepicker({
                    inline: true,
                    onClose: processChange,
                    onSelect: processChange
                });

                scope.$watch(modelAccessor, function (val) {
                    if (!val) return;
                    var date = new Date(val);
                    element.datepicker("setDate", date);
                    element.datepicker("option", "dateFormat", "dd/mm/yy");
                });
            }
        };

    }]);
angular.module('mainApp')
    .directive('infoMessage', ['$location', '$anchorScroll', '$window', function ($location, $anchorScroll, $window) {

        function link(scope, element, attr) {

            //close Message Box
            scope.CloseMessage = function () {
                scope.message = null;
            }

            //scroll to id and set focus on element with id
            scope.GoTo = function (id) {
                $location.hash(id);
                $anchorScroll();
                var element = $window.document.getElementById(id);
                if (element)
                    element.focus();
                $location.hash(null);
            }
        }
        return {
            restrict: 'AE',
            scope: {
                message: '='
            },
            templateUrl: 'templates/message.tpl.html',
            link: link
        }
    }]);
//password validation directive
angular.module('mainApp')
    .directive('password', [function () {
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

        return {
            require: 'ngModel',
            link: function(scope, element, attr, ctrl) {
                ctrl.$validators.password = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) return true;

                    if (checkMinimumPassword(viewValue)) return true;

                    return false;
                };
            }
        };
    }]);
angular.module('mainApp')
    .controller('loginCtrl', ['$scope', '$location', 'LoginModel',
        function ($scope, $location, LoginModel) {
            //intialize user with empty object
            var user = new LoginModel();
            $scope.userLogin = user;

            //login
            $scope.Login = function () {
                //check if input is valid
                if (!isValid()) return;

                var username = $scope.userLogin.username;
                var password = $scope.userLogin.password;

                //check username and password are correct
                user.checkValidity(username, password)
                    .then(function (message) {
                        if (user.isValid)
                            $location.path('/home');
                        else {
                            $scope.message = {
                                success: false,
                                info: message + '!',
                                notification: 'Oops!',
                                errorInfo: 'Go to error.',
                                errorElement: 'password'
                            }
                            $scope.userLogin.password = "";
                        }
                    });

            }

            //redirect to registration page
            $scope.GotoRegister = function () {
                $location.path('/register');
            }

            //validate input for invalid or empty entry
            function isValid() {
                if ($scope.form.$invalid) {
                    var firstError = null;

                    if ($scope.form.username.$invalid) firstError = 'username';

                    if ($scope.form.password.$invalid)
                        if (!firstError) firstError = 'password';

                    $scope.message = {
                        success: false,
                        info: 'Looks like you need to adjust few things.',
                        notification: 'Oh Snap!',
                        errorInfo: 'Go to first error.',
                        errorElement: firstError
                    }
                    return false;
                } else
                    return true;
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
            $scope.compareValue = $scope.user.email;

            //quickfix for dropdown directive
            $scope.user.sex = 'na';

            //set default type for password box
            $scope.passwordType = 'password';
            
            $scope.Register = function () {
                //check inputs are valid
                if (!validate()) return;

                //create registerModel object
                var reg = new RegisterModel($scope.user);

                //check email and verifyEmail are same
                if (!reg.compareEmail()) {
                    $scope.user.email = '';
                    $scope.user.verifyEmail = '';
                    $scope.message = {
                        success: false,
                        info: 'Email and verify email should be same..',
                        notification: 'Hmmm!',
                        errorInfo: 'Go to error.',
                        errorElement: 'email'
                    }
                    return;
                }

                //register user data
                reg.register($scope.user.password).then(function (success) {
                    $location.path('/home');
                }, function (error) {

                });
            }

            //redirect to login page
            $scope.GotoLogin = function () {
                $location.path('/login');
            }

            //show password
            $scope.ShowPassword = function ($event) {
                console.log($event);
                $scope.passwordType = $event.target.checked ? 'text' : 'password';
            }

            //validate input for invalid or empty entry
            function validate() {
                if ($scope.form.$invalid) {
                    var firstError = null;

                    if ($scope.form.forename.$invalid) firstError = 'forename';

                    if ($scope.form.surname.$invalid)
                        if (!firstError) firstError = 'surname';

                    if ($scope.form.dob.$invalid)
                        if (!firstError) firstError = 'dob';

                    if ($scope.form.email.$invalid)
                        if (!firstError) firstError = 'email';

                    if ($scope.form.verifyEmail.$invalid)
                        if (!firstError) firstError = 'verifyEmail';

                    if ($scope.form.password.$invalid)
                        if (!firstError) firstError = 'password';

                    $scope.message = {
                        success: false,
                        info: 'Looks like you need to adjust few things.',
                        notification: 'Oh Snap!',
                        errorInfo: 'Go to first error.',
                        errorElement: firstError
                    }
                    return false;
                } else
                    return true;
            }
        }]);

})();