﻿angular.module('mainApp')
    .factory('RegisterModel', [function () {
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
                return this;
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
