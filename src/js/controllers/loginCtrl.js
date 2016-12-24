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