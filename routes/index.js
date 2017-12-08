var express = require('express');
var fs = require('fs');
var router = express.Router();
var request = require('request')
var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  url: String,
});
mongoose.model('Product', ProductSchema);
var Product = mongoose.model('Product');
// mongoose.connect('mongodb://localhost/productDB', { useMongoClient: true }); //Connects to a mongo database called "commentDB"

// var productSchema = mongoose.Schema({ //Defines the Schema for this database
// 	Name: String,
// 	Price: String,
// 	Url: String
// });

// var Product = mongoose.model('Product', productSchema); //Makes an object from that schema as a model

// var db = mongoose.connection; //Saves the connection as a variable to use
// db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
// db.once('open', function() { //Lets us know when we're connected
// 	console.log('Connected');
// });


/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('admin.html', { root:  'public' });
});

router.get('/customer', function(req, res, next) {
	res.sendFile('customer.html', { root:  'public' });
});

router.post('/products', function(req, res, next) {
	console.log("POST product route"); //[1]
	var newproduct = new Product(req.body); //[3]
	console.log(newproduct); //[3]
	newproduct.save(function(err, post) { //[4]
		if (err) return console.error(err);
		console.log(post);
		res.json(post);
	});
});

router.get('/products', function(req, res, next) {
	console.log("In the GET route?");
	Product.find(function(err,productList) { //Calls the find() method on your database
	  if (err) return console.error(err); //If there's an error, print it out
	  else {
	    console.log(productList); //Otherwise console log the comments you found
	    res.json(productList); 	    
	  }
	})
});

router.param('products', function(req, res, next, id) {
  var query = Product.findById(id);
  query.exec(function (err, product){
    if (err) { return next(err); }
    if (!product) { return next(new Error("can't find product")); }
    req.product = product;
    return next();
  });
});

router.delete('/products', function(req, res, next) {
	console.log("In the delete route");
	Product.find().remove(function(err){
	  	if (err) return console.error(err); //If there's an error, print it out
	  	else {
	  		res.sendStatus(200);
	  	}
	})
});

module.exports = router;

// var express = require('express');
// var fs = require('fs');
// var router = express.Router();
// var request = require('request')

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.sendFile('weather.html', { root:  'public' });
// });

// router.get('/getcity',function(req,res,next) {
//     console.log("In getcity route");
//     fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
//       if(err) throw err;
//       var myRe = new RegExp("^" + req.query.q);
//       console.log(myRe);
//       var cities = data.toString().split("\n");
//       var jsonresult = [];
//       for(var i = 0; i < cities.length; i++) {
//         console.log(cities[i]);
//         var result = cities[i].search(myRe);
//         if(result != -1) {
//           console.log(cities[i]);
//           jsonresult.push({city:cities[i]});
//         }
//       }
//       res.status(200).json(jsonresult);
//     });
//   });

// router.get('/word',function(req,res,next) {
//     var par = req.query.w;
//     var owl = "https://owlbot.info/api/v1/dictionary/" + par;
// 	request(owl).pipe(res);
//  });
