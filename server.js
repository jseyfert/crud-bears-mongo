var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Bear = require('./models/bears');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

var bearRouter = require('./routes/bears');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index', {title: 'whats up!'});
});

app.get('/about', function(req, res){
	res.render('about', {time: new Date()});
});

// app.post('/addBear', function(req, res){
// 	console.log('Username: ' + req.body.username);
// 	console.log('Password: ' + req.body.password);

// 	 // res.render('addBear', {time: new Date()});
// });

app.get('/bears', function(req, res){
	Bear.find(function(err, bears) {
    		if (err) {
    			res.json(err);
    		} else {
    			res.render('bears', {bearList: bears});
    		} 
    	});
});


var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) { // middleware to 'use' for all requests
    console.log('Hell Yeah ' + port);
    next(); // make sure we go to the next routes and don't stop here
});


app.use('/api', bearRouter);

app.listen(port);
console.log('There server is on PORT ' + port);
