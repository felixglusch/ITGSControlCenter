var itgsApp = angular.module('itgsApp', ['ngRoute', 'colorpicker.module']);
// TODO: remove below variable from global scope
var categoryList = ["0 placeholder"];


itgsApp.controller('homeController', ['$scope', 'cardCategoryService',
    'cardDataService', 'sharedProperties', '$location', '$timeout',
    function ($scope, cardCategoryService, cardDataService, sharedProperties, $location, $timeout) {
        angular.element(document).ready(function () {
            cardCategoryService.queryCategories();
            cardDataService.queryData();

        });


        $timeout(function(){
            $scope.categories = categoryList;
            sharedProperties.setCategories($scope.categories);
            //$scope.cardTable = cardDataService.getDataTable();
            //console.log($scope.cardTable);
        }, 150);


        $('body').on("click", "button[name=btnListItem]", function () {
            // gets the text of the card (title)
            var title = $(this).text();
            var body = cardDataService.getCardBody(title);

            /* - Category
             * - Color
             * - SEIs
             */

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

        $scope.cardCategories = sharedProperties.getCategories();

        // The query that gets the list of SEIs for the checkbox list
        seiService.querySEIs();
        $timeout(function () {
            // sets the scope variable seiList to the array of sei titles for use in ng-repeat in card.html
            $scope.seiList = seiService.getSEITitles();
        }, 500);

    }]);


