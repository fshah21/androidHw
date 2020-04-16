const express = require('express')
const app = express()
const port = 8080;

var request = require('request')
var cors = require('cors')

app.use(cors());

app.get('/home', (req, res) => res.send('Hello World!'))

app.get('/latestguardian', function(req, res) {
	var apiKey = "36f5166b-ebc7-476b-85a9-eb6ab839f1b0";
	var api = "https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key="+apiKey;
	request( api, function( error, response, body) {
		if(!error && response.statusCode == 200){
			var json = JSON.parse(body);
			var jsonData = json.response.results;
			var articleArray = [];
			for(var i = 0; i < jsonData.length; i++){
				var article = [];
				article.push(jsonData[i].fields.thumbnail);
				article.push(jsonData[i].webTitle);
				article.push(jsonData[i].webPublicationDate);
				article.push(jsonData[i].sectionName);
				article.push(jsonData[i].id);
				articleArray.push(article);
			}
		}
		res.send(articleArray);
	})
})

app.get('/worldguardian', function(req, res) {
	var apiKey = "36f5166b-ebc7-476b-85a9-eb6ab839f1b0";
	var api = "https://content.guardianapis.com/world?api-key="+apiKey+"&show-blocks=all";
	request( api, function( error, response, body) {
		if(!error && response.statusCode == 200){
			var json = JSON.parse(body);
			var jsonData = json.response.results;
			console.log(jsonData);
			var articleArray = [];
			for(var i = 0; i < jsonData.length; i++){
				var article = [];
				try{
					var assetLength = jsonData[i].blocks.main.elements["0"].assets.length;
					article.push(jsonData[i].blocks.main.elements["0"].assets[assetLength-1].file);
				}
				catch{
					article.push("https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png");
				}
				article.push(jsonData[i].webTitle);
				article.push(jsonData[i].webPublicationDate);
				article.push(jsonData[i].sectionName);
				article.push(jsonData[i].id);
				articleArray.push(article);
			}
		}
		res.send(articleArray);
	})
})

app.get('/businessguardian', function(req, res) {
	var apiKey = "36f5166b-ebc7-476b-85a9-eb6ab839f1b0";
	var api = "https://content.guardianapis.com/business?api-key="+apiKey+"&show-blocks=all";
	request( api, function( error, response, body) {
		if(!error && response.statusCode == 200){
			var json = JSON.parse(body);
			var jsonData = json.response.results;
			var articleArray = [];
			for(var i = 0; i < jsonData.length; i++){
				var article = [];
				try{
					var assetLength = jsonData[i].blocks.main.elements["0"].assets.length;
					article.push(jsonData[i].blocks.main.elements["0"].assets[assetLength-1].file);
				}
				catch{
					article.push("https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png");
				}
				article.push(jsonData[i].webTitle);
				article.push(jsonData[i].webPublicationDate);
				article.push(jsonData[i].sectionName);
				article.push(jsonData[i].id);
				articleArray.push(article);
			}
		}
		res.send(articleArray);
	})
})

app.get('/politicsguardian', function(req, res) {
	var apiKey = "36f5166b-ebc7-476b-85a9-eb6ab839f1b0";
	var api = "https://content.guardianapis.com/politics?api-key="+apiKey+"&show-blocks=all";
	request( api, function( error, response, body) {
		if(!error && response.statusCode == 200){
			var json = JSON.parse(body);
			var jsonData = json.response.results;
			var articleArray = [];
			for(var i = 0; i < jsonData.length; i++){
				var article = [];
				try{
					var assetLength = jsonData[i].blocks.main.elements["0"].assets.length;
					article.push(jsonData[i].blocks.main.elements["0"].assets[assetLength-1].file);
				}
				catch{
					article.push("https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png");
				}
				article.push(jsonData[i].webTitle);
				article.push(jsonData[i].webPublicationDate);
				article.push(jsonData[i].sectionName);
				article.push(jsonData[i].id);
				articleArray.push(article);
			}
		}
		res.send(articleArray);
	})
})

app.get('/sportsguardian', function(req, res) {
	var apiKey = "36f5166b-ebc7-476b-85a9-eb6ab839f1b0";
	var api = "https://content.guardianapis.com/sport?api-key="+apiKey+"&show-blocks=all";
	request( api, function( error, response, body) {
		if(!error && response.statusCode == 200){
			var json = JSON.parse(body);
			var jsonData = json.response.results;
			var articleArray = [];
			for(var i = 0; i < jsonData.length; i++){
				var article = [];
				try{
					var assetLength = jsonData[i].blocks.main.elements["0"].assets.length;
					article.push(jsonData[i].blocks.main.elements["0"].assets[assetLength-1].file);
				}
				catch{
					article.push("https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png");
				}
				article.push(jsonData[i].webTitle);
				article.push(jsonData[i].webPublicationDate);
				article.push(jsonData[i].sectionName);
				article.push(jsonData[i].id);
				articleArray.push(article);
			}
		}
		res.send(articleArray);
	})
})

app.get('/techguardian', function(req, res) {
	var apiKey = "36f5166b-ebc7-476b-85a9-eb6ab839f1b0";
	var api = "https://content.guardianapis.com/technology?api-key="+apiKey+"&show-blocks=all";
	request( api, function( error, response, body) {
		if(!error && response.statusCode == 200){
			var json = JSON.parse(body);
			var jsonData = json.response.results;
			var articleArray = [];
			for(var i = 0; i < jsonData.length; i++){
				var article = [];
				try{
					var assetLength = jsonData[i].blocks.main.elements["0"].assets.length;
					article.push(jsonData[i].blocks.main.elements["0"].assets[assetLength-1].file);
				}
				catch{
					article.push("https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png");
				}
				article.push(jsonData[i].webTitle);
				article.push(jsonData[i].webPublicationDate);
				article.push(jsonData[i].sectionName);
				article.push(jsonData[i].id);
				articleArray.push(article);
			}
		}
		res.send(articleArray);
	})
})

app.get('/scienceguardian', function(req, res) {
	var apiKey = "36f5166b-ebc7-476b-85a9-eb6ab839f1b0";
	var api = "https://content.guardianapis.com/science?api-key="+apiKey+"&show-blocks=all";
	request( api, function( error, response, body) {
		if(!error && response.statusCode == 200){
			var json = JSON.parse(body);
			var jsonData = json.response.results;
			var articleArray = [];
			for(var i = 0; i < jsonData.length; i++){
				var article = [];
				try{
					var assetLength = jsonData[i].blocks.main.elements["0"].assets.length;
					article.push(jsonData[i].blocks.main.elements["0"].assets[assetLength-1].file);
				}
				catch{
					article.push("https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png");
				}
				article.push(jsonData[i].webTitle);
				article.push(jsonData[i].webPublicationDate);
				article.push(jsonData[i].sectionName);
				article.push(jsonData[i].id);
				articleArray.push(article);
			}
		}
		res.send(articleArray);
	})
})

app.get('/article', function(req, res) {
	var id = req.query.id;
	var articleApi = "";
	articleApi = "https://content.guardianapis.com/"+id+"?api-key=36f5166b-ebc7-476b-85a9-eb6ab839f1b0&show-blocks=all";
	request(articleApi, function(error, response, body) {
		if(!error && response.statusCode == 200) {
		var json = JSON.parse(body);
		var jsonData = json.response.content;
		var article = [];
		article.push(jsonData.webTitle);
		if(jsonData.blocks.main) {
				var assetLength = jsonData.blocks.main.elements["0"].assets.length;
				if(assetLength > 0)
				{
					article.push(jsonData.blocks.main.elements["0"].assets[assetLength-1].file);
				}
				else
				{
					article.push("https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png");
				}
			}
			else
			{
				article.push("https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png");
			}
		var date = jsonData.webPublicationDate;
		var newDate = date.split("T");
		var oldFormat = newDate[0];
		console.log(oldFormat);
		var justDate = newDate[0].split("-");
		var toreturn = "";
		var year = justDate[0];
		var day = justDate[2];
		var monthNo = justDate[1];
		var mName = monthNames[parseInt(monthNo)-1];
		toreturn = day + " " + mName + " " + year;
		article.push(toreturn);
		var desc = jsonData.blocks.body[0].bodyTextSummary;
		var counter = 0;
		var splitIndex = 0;
		for(i = 0; i < desc.length; i++)
		{	
			if(desc[i] == ".")
			{
				counter = counter + 1;
				if(counter == 4)
				{
					splitIndex = i;
					break;
				}
			}
		}
		var shortDesc = desc.substring(0, i+1);
		var nextPara = desc.substring(i+1);
		article.push(shortDesc);
		article.push(jsonData.webUrl);
		article.push(jsonData.id);
		article.push(jsonData.sectionId);
		article.push(oldFormat);
		article.push(nextPara);
		res.send(article);
		}
	})
})

app.listen(port, () => console.log(`Example listening on port ${port}!`))