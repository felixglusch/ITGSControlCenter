var itgsApp = angular.module('itgsApp', ['ngRoute', 'colorpicker.module']);
// TODO: remove below variable from global scope
var categoryList = ["0 placeholder"];

itgsApp.controller('homeController', ['$scope', 'cardCatQueryService',
    'cardDataQueryService', 'sharedProperties', '$location', '$timeout',
    function ($scope, cardCatQueryService, cardDataQueryService, sharedProperties, $location, $timeout) {

        cardCatQueryService.queryCategories();
        cardDataQueryService.queryData();

        $timeout(function(){
            $scope.categories = categoryList;
            //$scope.cardTable = cardDataQueryService.getDataTable();

            //console.log($scope.cardTable);
        }, 1000);

        $('body').on("click", "button[name=btnListItem]", function () {
            // gets the text of the card (title)
            var title = $(this).text();
            var body = cardDataQueryService.getCardBody(title);

            sharedProperties.setTitle(title);
            sharedProperties.setBody(body);
            $location.path('/card')
        });
    }]);

itgsApp.controller('cardController', ['$scope', 'sharedProperties', 'seiService', '$timeout',
    function ($scope, sharedProperties, seiService, $timeout) {
        $scope.sharedTitle = function () {
            return sharedProperties.getTitle();
        };
        $scope.sharedBody = function () {
            return sharedProperties.getBody();
        };

        // The query that gets the list of SEIs for the checkbox list
        seiService.querySEIs();
        $timeout(function () {
            // sets the scope variable seiList to the array of sei titles for use in ng-repeat in card.html
            $scope.seiList = seiService.getSEITitles();
        }, 200);

    }]);


