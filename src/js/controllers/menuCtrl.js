angular.module('mainApp')
    .controller('menuCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.isActive = function (path) {
            return $location.path() === path;
        }
    }]);