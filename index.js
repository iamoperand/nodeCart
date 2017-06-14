var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(__dirname + '/public_static'));

const cartApiRoute = require('./routes/api');
//const pageRoute = require('./routes/pages');

app.use('/', cartApiRoute);


app.listen(2222, function(){
	console.log("Listening on port 2222");
})