/**
 * Created by Felix on 2015-09-02.
 */
itgsApp.service('cardCategoryService', function () {
    return {
        queryCategories: function() {
            var CardCategories = Parse.Object.extend("CardCategories");
            var cardCategoryQuery = new Parse.Query(CardCategories);
            cardCategoryQuery.exists("category");
            cardCategoryQuery.exists("categoryID");
            cardCategoryQuery.ascending("categoryID");
            cardCategoryQuery.find({
                success: function (results) {
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        var category = object.get('category');
                        categoryList.splice(categoryList.length, 0, category);
                    }
                },
                error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }
    };
});

itgsApp.service('cardDataService', function () {
    var dict = {};
    return {
        getCardData: function (title, value) {
            return dict[title].get(value);
        },
        queryData: function () {
            var CardData = Parse.Object.extend("CardData");
            var cardDataQuery = new Parse.Query(CardData);
            cardDataQuery.limit(1000);
            cardDataQuery.ascending("category");
            cardDataQuery.exists("title");
            cardDataQuery.find({
                success: function (results) {
                    //console.log("success, card data query");
                    var previousCatID = 0;
                    var list = $("#cardTable");
                    for (var i = 0; i < results.length; i++) {

                        var cardObject = results[i];
                        var title = cardObject.get('title');
                        dict[title] = cardObject;
                        //console.log("The value at (" + title + ") is (" + dict[title] + ")");

                        var currentCatID = cardObject.get('category');
                        // TODO: remove DOM modifications from service. They work here, but it's not best practice.
                        if (currentCatID != previousCatID) {
                            //table.splice(table.length, 0, categoryList[currentCatID]);
                            list.append('<h3 class="cardCategory" id="category'
                                + currentCatID + '">' + categoryList[currentCatID] + '</h3>')
                        }
                        previousCatID = currentCatID;
                        list.append('<button name="btnListItem" class="list-group-item">' + title + '</button>');
                        //table.splice(table.length, 0, title);
                    }
                    //console.log(dict);
                },
                error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }
    }
});

itgsApp.service('seiDataService', function () {
    var dict = {};
    return {
        getCardData: function (cardId, value) {
            // could be more than one SEI per card
            function hasMoreSeis(counter) {
                return dict[counter].get("card") == cardId;
            }

            var seiIDs = [];
            if (value == "SEI") {
                var counter = cardId;
                while (hasMoreSeis(counter)) {
                    var seiId = dict[counter].get("SEI");
                    seiIDs.splice(seiIDs.length, 0, seiId);
                    counter += 1;
                }
            } else {
                return dict[cardId].get(value);
            }

        },
        queryData: function () {
            var SeiData = Parse.Object.extend("CardsSEIs");
            var seiDataQuery = new Parse.Query(SeiData);
            seiDataQuery.ascending('card');
            seiDataQuery.limit(1000);
            seiDataQuery.find({
                success: function (results) {
                    for (var i = 1; i <= results.length; i++) {
                        //var seiObject = results[i];
                        //var cardId = seiObject.get('card');
                        dict[i] = results[i];
                    }
                    console.log(dict);
                },
                error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }

    }
});

itgsApp.service('seiService', function() {
    var titles = [];

    return {
        getSEITitles: function(){
            return titles;
        },
        querySEIs: function() {
            var title = "";
            var SEI = Parse.Object.extend("SEI");
            var seiQuery = new Parse.Query(SEI);
            seiQuery.ascending("SEIid");
            seiQuery.exists("title");
            seiQuery.find({
                success: function (results) {
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        title = " " + object.get('title');
                        //var htmlElement = '<label class="smallPadding"><input type="checkbox">' + title + '</label>';
                        titles.splice(titles.length , 0, title);
                    }
                },
                error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }
    };
});


