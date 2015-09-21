// TODO: remove below variable from global scope
var categoryList = ["0 placeholder"];


var itgsApp = angular.module('itgsApp', ['ngRoute']);
/*
 $rootScope.$on("$routeChangeStart", function (event, next, current) {
 if (sessionStorage.restorestate == "true") {
 $rootScope.$broadcast('restorestate'); //let everything know we need to restore state
 sessionStorage.restorestate = false;
 }
 });

 //let everthing know that we need to save state now.
 window.onbeforeunload = function (event) {
 $rootScope.$broadcast('savestate');
 };
 */


itgsApp.controller('homeController', ['$scope', 'cardCategoryService',
    'cardDataService', 'seiDataService', 'sharedProperties',
    '$location', '$timeout',
    function ($scope, cardCategoryService, cardDataService, seiDataService, sharedProperties,
              $location, $timeout) {


        //$scope.home = homeService;


        cardCategoryService.queryCategories();
        cardDataService.queryData();
        seiDataService.queryData();

        $timeout(function () {
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

itgsApp.controller('cardController', ['$scope', 'sharedProperties',
    'seiService', '$timeout',
    function ($scope, sharedProperties, seiService, $timeout) {


        //$scope.card  = cardService;


        seiService.querySEIs();
        $timeout(function () {
            $scope.properties = {
                title: sharedProperties.getTitle(),
                content: sharedProperties.getBody(),
                categories: sharedProperties.getCategories(),
                category: sharedProperties.getSingleCategory(),
                colour: sharedProperties.getColour(),
                seis: seiService.getSEITitles(),
                seiIDs: sharedProperties.getCardSEI_Ids()
            };
            console.log($scope.properties);
        }, 350);

/*
        $scope.$watch('properties.title', function (newVal, oldVal, scope) {
            $scope.properties.title = newVal;
        });

        $scope.$watch('properties.content', function (newVal, oldVal, scope) {
            $scope.properties.content = newVal;
        });
*/

        // toggle selection for a given sei by name
        $scope.toggleSelection = function toggleSelection(sei) {
            /* Check if an sei (by id) is inside the seiIDs array.
             * If it is, then delete it (** DELETE **). If not, add it. (** ADD **) */

            var seiIndexOf = $scope.properties.seis.indexOf(sei);
            var seiIDIndexOf = $scope.properties.seiIDs.indexOf(seiIndexOf);

            //console.log("seiIDIndexOf " + seiIDIndexOf);
            // is currently selected ....... ** ADD **
            if (seiIDIndexOf == -1) {
                //console.log("pushed");
                $scope.properties.seiIDs.push(seiIndexOf);

            }
            // is newly selected ....... ** DELETE **
            else {
                //console.log("spliced");
                $scope.properties.seiIDs.splice(seiIDIndexOf, 1);

            }
            //console.log($scope.properties.seiIDs);
        };

    }]);


