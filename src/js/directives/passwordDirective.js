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