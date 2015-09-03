/**
 * Created by Felix on 2015-09-03.
 */
itgsApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/card', {
            templateUrl: 'pages/card.html',
            controller: 'cardController'
        });
});
