/**
 * Created by Felix on 2015-09-03.
 */
itgsApp.service('sharedProperties', function () {
    var title = 'title';
    var body = 'body';
    var cardCategories = [];
    var colour = "";
    var category = "";
    var cardSEI_Ids = [];
    return {
        getTitle: function ()         { return title; },
        setTitle: function (val)      { title = val; },

        getBody: function ()          { return body; },
        setBody: function (val)       { body = val; },

        getCategories: function ()    { return cardCategories; },
        setCategories: function (val) { cardCategories = val; },

        getSingleCategory: function ()    { return category; },
        setSingleCategory: function (val) { category = cardCategories[val]; },

        getColour: function ()        { return colour; },
        setColour: function (val)     { colour = "#" + val; },

        getCardSEI_Ids: function ()         { return cardSEI_Ids; },
        setCardSEI_Ids: function (vals)     { cardSEI_Ids = vals; }
    };
});