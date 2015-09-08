var itgsApp = angular.module('itgsApp', ['ngRoute', 'colorpicker.module']);
// TODO: remove below variable from global scope
var categoryList = ["0 placeholder"];

itgsApp.controller('homeController', ['$scope', 'cardCategoryService',
    'cardDataService', 'seiDataService','sharedProperties',
    '$location', '$timeout',
    function ($scope, cardCategoryService, cardDataService, seiDataService,sharedProperties,
              $location, $timeout) {
        angular.element(document).ready(function () {
            cardCategoryService.queryCategories();
            cardDataService.queryData();
            seiDataService.queryData();
        });

        $timeout(function(){
            $scope.categories = categoryList;
            sharedProperties.setCategories($scope.categories);
        }, 450);

        $('body').on("click", "button[name=btnListItem]", function () {
            var title = $(this).text();
            // Get attribute (2nd param) with this title (1st param)
            var body = cardDataService.getCardData(title, "text");
            var colour = cardDataService.getCardData(title, "colourID");
            var categoryID = cardDataService.getCardData(title, "category");
            var cardID = cardDataService.getCardData(title, "cardId");
            console.log("card ID " + cardID);
            // Get attribute (2nd param) with this card id number (1st param)... array
            var seiIDs = seiDataService.getCardData(cardID, "SEI");

            sharedProperties.setTitle(title);
            sharedProperties.setBody(body);
            sharedProperties.setColour(colour);
            sharedProperties.setSingleCategory(categoryID);
            sharedProperties.setCardSEI_Ids(seiIDs);
            $location.path('/card')
        });
    }]);

itgsApp.controller('cardController', ['$scope', 'sharedProperties', 'seiService', '$timeout',
    function ($scope, sharedProperties, seiService, $timeout) {
        seiService.querySEIs();
        $timeout(function () {
            $scope.properties = {
                title: sharedProperties.getTitle(),
                content: sharedProperties.getBody(),
                categories: sharedProperties.getCategories(),
                category: sharedProperties.getSingleCategory(),
                colour: sharedProperties.getColour(),
                seis: seiService.getSEITitles(),
                seiID: sharedProperties.getCardSEI_Ids()
            };
            console.log($scope.properties);
        }, 350);

    }]);


