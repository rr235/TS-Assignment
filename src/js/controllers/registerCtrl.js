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