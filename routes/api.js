/*
	Routes are handled here
*/

const route = require('express').Router();
const data = require('../data');

route.get('/cart/getcart', function(req, res){
	data.getProducts().then((results) => {
		res.send(results);
	})
	
});

route.post('/new', function(req, res){
	let product = req.body.newproduct; 
	console.log('posting with ',product);
		data.addProduct(product).then(() => {
			console.log('post request implementing');
			res.redirect('/public');

		}).catch((err) => {
			res.send(err);
		});
});

route.post('/product/increment', function(req, res){
	let product_name = req.body.name;
	let quantum = req.body.quantum;
		data.incrementQuantity(product_name, quantum).then(() => {
			res.redirect('/cart/getcart');
		}).catch((err) => {
			res.send(err);
		});
});

route.post('/product/decrement', function(req, res){
	let product_name = req.body.name;
	let quantum = req.body.quantum;
		data.decrementQuantity(product_name, quantum).then(() => {
			res.redirect('/cart/getcart');
		}).catch((err) => {
			res.send(err);
		});
});

route.post('/product/delete', function(req, res){
	let product_name = req.body.name;
		data.deleteProduct(product_name).then(() => {
			res.redirect('/cart/getcart');
		}).catch((err) => {
			res.send(err);
		});
});

module.exports = route;