'use strict';

angular.module('myApp.second', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/second', {
        templateUrl: 'second/second.html',
        controller: 'SecondCtrl'
    });
}])

.controller('SecondCtrl', [function () {
    console.log('hello world')
}]);