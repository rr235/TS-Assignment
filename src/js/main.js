var mainapp = angular.module('mainApp', ['ngRoute']);

mainapp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    //Add this in case of angular 1.6 
    //in ang1.6 # is explecting a bang(!) in the route
    //so in ang1.6 Eg: abc.com/#!/login instead of abc.com/#/login in ang1.5
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/login',
        {
            templateUrl: 'templates/login.tpl.html',
            controller: 'loginCtrl'
        })
        .when('/register',
        {
            templateUrl: 'templates/register.tpl.html',
            controller: 'registerCtrl'
        })
        .when('/home',
        {
            templateUrl: 'templates/home.tpl.html'
        })
        .otherwise({ redirectTo: '/login' });

}]);

