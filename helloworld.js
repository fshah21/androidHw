const express = require('express')
const app = express()
const port = 8080;
const googleTrends = require('google-trends-api');

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
				try {
				var article = [];
				if(jsonData[i].fields.thumbnail == null || jsonData[i].fields.thumbnail == ""){
					article.push("https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png");
				}
				else {
					article.push(jsonData[i].fields.thumbnail);
				}
				article.push(jsonData[i].webTitle);
				article.push(jsonData[i].webPublicationDate);
				article.push(jsonData[i].sectionName);
				article.push(jsonData[i].id);
				article.push(jsonData[i].webUrl);
				articleArray.push(article);
				}
				catch(e){
					continue;
				}
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
			var articleArray = [];
			for(var i = 0; i < jsonData.length; i++){
				try {
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
				article.push(jsonData[i].webUrl);
				articleArray.push(article);
				}
				catch(e) {
					continue;
				}
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
				try {
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
				article.push(jsonData[i].webUrl);
				articleArray.push(article);
				}
				catch(e) {
					continue;
				}
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
				try {
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
				article.push(jsonData[i].webUrl);
				articleArray.push(article);
				}
				catch(e) {
					continue;
				}
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
				try {
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
				article.push(jsonData[i].webUrl);
				articleArray.push(article);
				}
				catch(e) {
					continue;
				}
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
				try {
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
				article.push(jsonData[i].webUrl);
				articleArray.push(article);
				}
				catch(e) {
					continue;
				}
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
				try {
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
				article.push(jsonData[i].webUrl);
				articleArray.push(article);
				}
				catch(e) {
					continue;
				}
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
		article.push(jsonData.id);
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
		article.push(jsonData.webTitle);
		article.push(jsonData.webPublicationDate)
		article.push(jsonData.sectionName);
		var desc = "";
		for(var i = 0; i < jsonData.blocks.body.length; i++)
		{
			desc += jsonData.blocks.body[i].bodyHtml;
		}
		article.push(desc);
		article.push(jsonData.webUrl);
		res.send(article);
		}
	})
})

app.get('/trending', function(req, res) {
	var keywordForTrends = req.query.keyword;
	googleTrends.interestOverTime( { keyword : keywordForTrends, startTime : new Date('2019-06-01')}, function(err, results) {
		var defaultData = JSON.parse(results);
		var data = defaultData.default.timelineData;
		var length = data.length;
		var values = [];
		for(var i = 0; i < length; i++){
			var eachObject = data[i];
			var value = eachObject.value[0];
			values.push(value);
		}
		console.log(values[40]);
		res.send(values);
	});
})

app.get('/search', function(req, res) {
	var keyword = req.query.keyword;
	articleApi = "https://content.guardianapis.com/search?q="+keyword+"&api-key=36f5166b-ebc7-476b-85a9-eb6ab839f1b0&show-blocks=all";
	request( articleApi, function( error, response, body) {
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
				article.push(jsonData[i].webUrl);
				articleArray.push(article);
			}
		}
		res.send(articleArray);
	})
})

app.listen(port, () => console.log(`Example listening on port ${port}!`))