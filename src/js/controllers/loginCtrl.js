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
                            if (user.isValid)
                                $location.path('/home');
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