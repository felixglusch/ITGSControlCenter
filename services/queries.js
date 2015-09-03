/**
 * Created by Felix on 2015-09-02.
 */
itgsApp.service('cardCatQueryService', function () {
    this.queryCategories = function () {
        var navCatList = $("#categoryNavList");

        var CardCategories = Parse.Object.extend("CardCategories");
        var cardCategoryQuery = new Parse.Query(CardCategories);
        cardCategoryQuery.exists("category");
        cardCategoryQuery.exists("categoryID");
        cardCategoryQuery.ascending("categoryID");
        cardCategoryQuery.find({
            success: function (results) {

                //console.log("success, card category query");
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    var category = object.get('category');
                    categoryList.splice(categoryList.length, 0, category);
                }

                for (var i = 1; i < categoryList.length; i++) {
                    if (i == 1) {
                        navCatList.append('<li class="active"><a href="#category' + i
                            + '">' + categoryList[i] + '</a></li>');
                    } else {
                        navCatList.append('<li><a href="#category' + i
                            + '">' + categoryList[i] + '</a></li>');
                    }
                }
                console.log(categoryList);

            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
});



itgsApp.service('cardDataQueryService', function () {
    var dict = {};

    return {
        getCardBody: function (key) {
            return dict[key];
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

                        var currentCatID = object.get('category');
                        if (currentCatID != previousCatID) {
                            list.append('<h3 class="cardCategory" id="category'
                                + currentCatID + '">' + categoryList[currentCatID] + '</h3>')
                        }
                        previousCatID = currentCatID;
                        list.append('<button  name="btnListItem" class="list-group-item">' + title + '</button>');
                    }
                },
                error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }
    }
});




