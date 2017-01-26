var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    user = require('./app/models/user'),
    resp = require('./app/models/NMResponse');
    //,Bear = require('./app/models/');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var port = process.env.port || 3000;

var router = express.Router();
var NMResp = new resp.Response();

router.get('/', (req, res) => {
    res.json({ API: 'lok\'tar ogar! Bienvenido al Api de Nagamolten!' });
    //user.createTable();
});

router.route('/user')
    .get((req,res)=>{
        user.getUser(null, (err, usr)=>{
            if(err)
                res.send(err);
                
            res.json(usr);                
        })
    })
    
    .post((req,res)=>{
        var NMResp = new resp.Response();            
        user.addUser(req.body);

        NMResp.count = "1";
        NMResp.message = "the user "+req.body.name+" has been created.";

        res.json(NMResp);
    });


// app.get('/',  (req, res) => {
//     //res.send("hello world");
//     res.sendFile(__dirname+'/index.html');
//     //console.log(__dirname, __filename);


// });

// app.post('/quotes', (req, res) => {
//     //console.log("Helloooooooooooooooo!");
//     console.log(req.body);
// });

app.use('/api', router);

app.listen(3000);

console.log("Nagamolten API Listen at http://localhost:3000/api");

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
