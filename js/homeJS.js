

var CardData = Parse.Object.extend("CardData");
var query = new Parse.Query(CardData);
query.limit(1000);
query.ascending("category");
query.exists("title");
query.find({
    success: function (results) {
        console.log("Successfully retrieved " + results.length + " titles.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            var title = object.get('title')
            console.log(title);


            arrayToULList(title); // run function and fill the UL with LI's
        }

    },
    error: function (error) {
        alert("Error: " + error.code + " " + error.message);
    }


});

var list = $("#cardTable");

function arrayToULList(title) {
    list.append('<button type="button" class="list-group-item">' + title + '</button>');
}
