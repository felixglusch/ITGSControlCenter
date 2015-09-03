var itgsApp = angular.module('itgsApp', ['ngRoute']);
// TODO: remove below variable from global scope
var categoryList = ["0th element placeholder"];

itgsApp.controller('homeController', ['$scope', 'cardCatQueryService',
    'cardDataQueryService', 'sharedProperties','$location',
    function ($scope, cardCatQueryService, cardDataQueryService, sharedProperties, $location) {

        cardCatQueryService.queryCategories();
        cardDataQueryService.queryData();

        $('body').on("click", "button[name=btnListItem]", function () {
            // gets the text of the card (title)
            var title = $(this).text();
            var body = cardDataQueryService.getCardBody(title);

            sharedProperties.setTitle(title);
            sharedProperties.setBody(body);
            $scope.changeView('/card');
        });

        $scope.changeView = function(view){
            $location.path(view);
        }

    }]);

itgsApp.controller('cardController', ['$scope', 'sharedProperties',
    function ($scope, sharedProperties) {
        $scope.sharedTitle = function(){
            return sharedProperties.getTitle();
        };
        $scope.sharedBody = function(){
            return sharedProperties.getBody();
        };
    }]);


