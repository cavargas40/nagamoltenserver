var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    model = require('./app/models/db.model'),
    resp = require('./app/models/NMResponse'),
    user = require('./app/models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var port = process.env.port || 3000;

var router = express.Router();
var NMResp = new resp.Response();

router.get('/', (req, res) => {
    res.json({ API: 'lok\'tar ogar! Bienvenido al API de Nagamolten v2.0.1!' });
    //model.init();    
});

//User begin
router.route('/user')
    .get((req, res) => {
        var a = 0 / 0;
        user.getUser(null, (err, usr) => {
            if (err)
                res.send(err);
            
            res.json(usr);
        })
    })
    .post((req, res) => {
        var NMResp = new resp.Response();
        user.addUser(req.body);

        NMResp.count = "1";
        NMResp.message = "the user " + req.body.name + " has been created.";

        res.json(NMResp);
    });

router.route('/user/:userId')
    .get((req,res)=>{
        res.json({omg:"nice " + req.params.userId})
    });

//User end

app.use('/', router);
app.listen(3000);

console.log("Nagamolten API Listen at http://localhost:3000/");