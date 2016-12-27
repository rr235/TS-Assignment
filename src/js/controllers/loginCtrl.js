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