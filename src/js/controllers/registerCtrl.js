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