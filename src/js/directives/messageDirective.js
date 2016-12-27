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