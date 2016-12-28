angular.module('mainApp')
    .controller('menuCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.isActive = function (path) {
            return $location.path() === path;
        }
        $scope.showMobileMenu = false;

        $scope.toggleMobileMenu = function () {
            $scope.showMobileMenu = !$scope.showMobileMenu;
        }

        $scope.goTo = function(path) {
            $scope.showMobileMenu = false;
            $location.path(path);
        }
    }]);