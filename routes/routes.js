/*
 * GET home page.
 */
 var _ = require('underscore');
 var db = require('../db');
 db.createConnection();

 exports.about = function(req, res){
 	db.dbCall("select * from posts where category = 'about' order by post_date", function(data){
 		res.render('index', { viewdata: data});
 	});
 };

 exports.processing = function(req, res){
 	db.dbCall("select * from posts where category = 'projects' order by post_date", function(data){
 		res.render('index', { viewdata: data});
 	});
 }; 

 exports.blog = function(req, res){
 	db.dbCall("select * from posts where category = 'blog' order by post_date", function(data){
 		res.render('index', { viewdata: data});
 	});
 }; 

 exports.home = function(req, res){
 	res.render('home', { 
 		
 	});
 }; 
