var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));


app.get('/', function(req, res){
	res.render("index.ejs");
});

app.get('/weathernow/', function(req, res){
	var city = req.query.city;
	var url = "https://api.apixu.com/v1/current.json?key=b3ee061b34324491a0f124223172010&q=" + city;
	request(url,function(error, response, body){
			if(!error && response.statusCode == 200){
				var weatherData = JSON.parse(body);
				console.log(weatherData);
				res.render("main.ejs", {weatherData: weatherData}); 
			}else{
				res.send("The city you entered has not been found.");
			}
		});
	// request("https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22lyksilis%2C%20lt%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", 
	// 	function(error, response, body){
	// 		if(!error && response.statusCode == 200){
	// 			var weatherData = JSON.parse(body);
	// 			console.log(sunsetData);
	// 			res.render("main.ejs", {sunsetData: sunsetData}); 
	// 		}
	// 	})
});


app.listen(3000, function(){
	console.log("Server has been started.")
});