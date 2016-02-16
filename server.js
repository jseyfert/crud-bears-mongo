var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Bear = require('./app/models/bears');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) { // middleware to 'use' for all requests
    console.log('Hell Yeah ' + port);
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/bears')//.post()  we could also add it like this if we werent chaining

    // create a bear 
    .post(function(req, res) {

    	// res.json({title: "I just made a post!"}); *TEST*
        
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)
        bear.age = req.body.age; 
        bear.gender = req.body.gender; 	
        
        // res.json(bear); *TEST*

        // save the bear and check for errors
        bear.save(function(err, bear) {
            if (err) {
                res.json(err);
            } else {
            	res.json(bear);}
        });
        
    });

// router.get('/', function(req, res) {
// 	res.json({message: 'Welcome to my API on PORT ' + port });
// });

app.use('/api', router);

app.listen(port);
console.log('There server is on PORT ' + port);

