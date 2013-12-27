/*
 * GET home page.
 */
 var db = require('./db');

 exports.home = function(req, res){
 	res.render('index', { 
 		header: 'My hackerspace', 
 		ingress: 'This is my site, here I do stuff with computers.',
 		content: 'This site is running on node.js, express framework, the styling is made with a custom twitter bootstrap template.'
 	});
 };

 exports.tst = function(req, res){
 	res.send("respond with a resource, the source is nothing "+db.timenow());
 };