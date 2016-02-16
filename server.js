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

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)
        bear.age = req.body.age; 
        bear.gender = req.body.gender; 	
                
        bear.save(function(err, bear) { // save the bear and check for errors
        	if (err) {
        		res.json(err);
        	} else {
        		res.json(bear);
        	}
        });
    })

    .get(function(req, res) { // get bear from DB
    	Bear.find(function(err, bears) {
    		if (err) {
    			res.json(err);
    		} else {
    			res.json(bears);
    		}
    	});
    });

router.route('/bears/:bear_id')

	.get(function(req, res) { //get bear by specific id
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err) {
				res.json(err);
			} else {
				res.json(bear);
			}
		});
	})

	.put(function(req, res) { //update(put) bear by specific id
	Bear.findById(req.params.bear_id, function(err, bear) {
			if (err) {
				res.json(err);
			} else {

				bear.name = req.body.name ? req.body.name : bear.name;
				bear.age = req.body.age ? req.body.age : bear.age;
				bear.gender = req.body.gender ? req.body.gender : bear.gender;

				bear.save(function(err) {
					if (err) {
						res.json(err);
					} else {
						res.json(bear);
					}
				});	
			}
		});
	})

	.delete(function(req, res) { //delete bear by specific id
			// console.log(req.body.name);
		Bear.remove({_id: req.params.bear_id}, function(err, bear) {
			if (err) {
				res.json(err);
			} else {
				res.json("Da bear is gone!");
			}
		});
	});

app.use('/api', router);

app.listen(port);
console.log('There server is on PORT ' + port);
