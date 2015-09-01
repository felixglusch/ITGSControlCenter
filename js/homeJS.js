
var categoryList = ["0th element placeholder"];
var navCatList = $("#categoryNavList");

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
        for (var i = 1; i < categoryList.length; i++) {
            if (i == 1) {
                navCatList.append('<li class=active><a href="#category' + i
                    + '">' + categoryList[i] + '</a></li>');
            } else {
                navCatList.append('<li><a href="#category' + i
                    + '">' + categoryList[i] + '</a></li>');
            }
        }
    },
    error: function (error) {
        alert("Error: " + error.code + " " + error.message);
    }
});

var CardData = Parse.Object.extend("CardData");
var cardDataQuery = new Parse.Query(CardData);
cardDataQuery.limit(1000);
cardDataQuery.ascending("category");
cardDataQuery.exists("title");
cardDataQuery.find({
    success: function (results) {
        var previousCatID = 0;
        var list = $("#cardTable");
        for (var i = 0; i < results.length; i++) {

            var object = results[i];
            var title = object.get('title');

            var currentCatID = object.get('category');
            if (currentCatID != previousCatID)
            {
                list.append('<h3 class="cardCategory" id="category'
                    + currentCatID + '">' + categoryList[currentCatID] + '</h3>')
            }
            previousCatID = currentCatID;
            list.append('<button type="button" class="list-group-item">'
                + title + '</button>');
        }
    },
    error: function (error) {
        alert("Error: " + error.code + " " + error.message);
    }
});

/*
var SEI = Parse.Object.extend("SEI");
var seiQuery = new Parse.Query(SEI);
seiQuery.ascending("SEIid");
seiQuery.exists("title");
seiQuery.limit(13);
seiQuery.find({
    success: function (results) {
        for (var i = 0; i < results.length; i++) {

            var object = results[i];
            var title = object.get('title');

            //navCatList.append('<li><a href="">' + title + '</a></li>')
        }
    },
    error: function (error) {
        alert("Error: " + error.code + " " + error.message);
    }
});
*/
