var express = require('express'),
	app = express(),
	server = require('http').createServer(app);

var	j5 = require("johnny-five"),
	board = new j5.Board();
 
var redPin = 13;
var greenPin = 12;
var OUTPUT = 1;

var redValue = 0; 
var greenValue = 0; 
var result = { "message" : "perfect"};

server.listen(3000, function (err){
	if (err)
        console.error(err);
    else
		console.log("Server listening on port 3000");
});

board.on("ready", function(){
  	this.pinMode(redPin, OUTPUT);
  	this.pinMode(greenPin, OUTPUT);    
   	 
	this.loop( 100, function(){		
		this.digitalWrite(redPin, (redValue));
		this.digitalWrite(greenPin, (greenValue)); 
	}); 
});

app.get('/', function(req, res){
	redValue = 0;
	greenValue = 0;	
	res.sendfile(__dirname + '/index.html');
});

app.get('/turnOff', function(req, res){
	console.log('turning off lights');
	Led(0, 0, res);		
});

app.get('/red', function(req, res){
	console.log('red light active');
	Led(1, 0, res);	
});

app.get('/green', function(req, res){
	console.log('gree light active');	
	Led(0, 1, res);		
});

function Led(red, green, res)
{
	redValue = red;
	greenValue = green;
	res.sendfile(__dirname + '/index.html');
}