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
    var table = [];
    var colours = [];
    return {
        getCardBody: function (key) {
            return dict[key];
        },
        getDataTable: function(){
            return table;
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

                        var object = results[i];
                        var title = object.get('title');
                        var body = object.get('text');
                        dict[title] = body;
                        //console.log("The value at (" + title + ") is (" + dict[title] + ")");
                        var colour = object.get('colourID');
                        colours.splice(colours.length, 0, colour);
                        var currentCatID = object.get('category');
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


