/**
 * Created by Felix on 2015-09-03.
 */
itgsApp.service('sharedProperties', function () {
    var title = 'title';
    var body = 'body';
    return {
        getTitle: function() {
            return title;
        },
        setTitle: function(val) {
            title = val;
        },
        getBody: function() {
            return body;
        },
        setBody: function(val) {
            body = val;
        }
    };
});