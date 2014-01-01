/*
 * GET home page.
 */
  var db = require('./db');

 exports.about = function(req, res){
 	res.render('index', { 
 		title: '', 
 		ingress: 'Welcome. I am a techie originating from Stockholm, Sweden.',
 		content: 'My name is Theo, here I display projects I code away at during rainy, snowy and sunny days.This site is running on heroku using node.js, express framework, ejs and postgres. The styling is made with a custom twitter bootstrap template. The virtualized heroku client is itself running on the amazon cloud (AWS). Feel free to mail me at <link>theoswe@gmail.com<link> if you are interested in hiring me for something or if you just got a question to ask.'
 	});
 };
 

 exports.home = function(req, res){
 	res.render('index', { 
 		title: '', 
 		ingress: '',
 		content: ''
 	});
 }; 

 exports.ath = function(req, res){
 	res.render('index', { 
 		title: 'some random cool stuff', 
 		ingress: 'Furry feet',
 		content: 'What do being a furry adventurer and telecommuting have in common?'
 	});
 }; 

 exports.test = function(req, res){
 	res.send(db.titles());
 };