var pg = require('pg');

var link = "postgres://ryqqhecpqhyeon:918f364235d148b8720624ff86613e35bd3b4d3b77ca7ec02f05e9c4841bd93b@ec2-54-235-247-224.compute-1.amazonaws.com:5432/d9k06thg7bod20";
pg.defaults.ssl = true;
module.exports = {
    query: function(text, values, cb) {
        console.log(" loginu " + text+  "  " + values);
        pg.connect(link, function(err, client, done) {
            console.log("jei eroras loginu " );
            console.log(err);
            console.log("baigiu logint");
            client.query(text, values, function(err, result) {
                done();
                cb(err, result);
            })
        });
    },
	queryWithParam: function(text, values, extraParam, cb) {
        console.log(" loginu " + text+  "  " + values);
        pg.connect(link, function(err, client, done) {
            console.log("jei eroras loginu " );
            console.log(err);
            console.log("baigiu logint");
            client.query(text, values, function(err, result) {
                done();
                cb(err, result, extraParam);
            })
        });
    }
}