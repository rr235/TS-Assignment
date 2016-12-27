//JQuery DatePicker directive
angular.module('mainApp')
    .directive('jqdatepicker', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            transclude: false,
            link: function (scope, element, attrs) {
                var modelAccessor = $parse(attrs.ngModel);

                //console.log(modelAccessor);

                var processChange = function () {
                    var date = new Date(element.datepicker("getDate"));

                    scope.$evalAsync(function (scope) {
                        // Change bound variable
                        modelAccessor.assign(scope, date);
                    });
                };

                element.datepicker({
                    inline: true,
                    onClose: processChange,
                    onSelect: processChange
                });

                scope.$watch(modelAccessor, function (val) {
                    if (!val) return;
                    var date = new Date(val);
                    element.datepicker("setDate", date);
                    element.datepicker("option", "dateFormat", "dd/mm/yy");
                });
            }
        };

    }]);