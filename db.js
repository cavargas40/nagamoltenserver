var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/nmdb');

db.serialize(function(){
    db.run("CREATE TABLE IF NOT EXISTS counts(key TEXT, value INTEGER)");
    db.run("INSERT INTO counts (key, value) VALUES (?, ?)", "counter", 0);
});

//desde aca!!

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/nmdb.db');

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS counts(key TEXT, value INTEGER)");
    db.run("INSERT INTO counts (key, value) VALUES (?, ?)", "counter", 0);
});

var express = require('express');
var app = express();

app.get('/data', function (req, res) {
    db.get("SELECT value FROM counts", function (err, row) {
        res.json({"count": row.value });
    })
});

app.post('/data', function (req, res) {
    db.run("UPDATE counts SET value = value + 1 WHERE key = ?", "counter", function(err, row){
        if (err){
            console.err(err);
            res.status(500);
        }
        else {
            res.status(202);
        }
        res.end();
    });
});

app.listen(3000);

console.log("Submit GET or POST to http://localhost:3000/data");

// app.get('/', function (req, res) {
//     // res.send('hello world');    
//     // //res.jsonp({'omg':'really'});
//     var responseText = 'Hello World!<br>'
//     responseText += '<small>Requested at: ' + req.requestTime + '</small>'
//     res.send(responseText)
// });

// app.listen(3000, function () {
//     console.log('App listening on port 3000!');
// });
