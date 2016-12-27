angular.module('mainApp')
    .directive('dropdown', ['$document', function ($document) {

        function link(scope, element, attr, ctrl) {
        scope.touched = false;
            scope.options = [
            { name: 'Please Select', value: 'na' },
            { name: 'Male', value: 'm' },
            { name: 'Female', value: 'f' }
            ];
            scope.selectedOption = { name: 'Please Select', value: 'na' };
            scope.showOptions = false;

            
            //show or hide options
            scope.Toggle = function () {
                ctrl.$setTouched();
                scope.touched = true;
                scope.showOptions = !scope.showOptions;
            }

            scope.select = function (option) {
                scope.selectedOption = option;
                scope.showOptions = false;
                scope.selection = option.value;
            }

            ctrl.$validators.select = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) return true;
                
                if (scope.touched && modelValue !== 'na') return true;

                return false;
            };

            //clicked anywhere but here
            var handler = function (event) {
                if (!element[0].contains(event.target)) {
                    scope.$evalAsync(function() {scope.showOptions = false;});
                    
                }
            };

            $document.on('click', handler);
            scope.$on('$destroy', function () {
                $document.off('click', handler);
            });
        }
        return {
            require:'ngModel',
            restrict: 'E',
            scope: {
                selection: '='
            },
            templateUrl: 'templates/dropdown.tpl.html',
            link: link,
            replace: true
        }
    }]);