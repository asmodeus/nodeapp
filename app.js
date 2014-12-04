/**
 * Module dependencies.
 */
 var express = require('express');
 var http = require('http');
 var path = require('path');
 var db = require( './controllers/db' );
 var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('53cr3t'));
app.use(express.session());
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);


// development only
if ( 'development' == app.get('env') ) {
	app.use(express.errorHandler());
}

app.param(function(name, fn){
  if (fn instanceof RegExp) {
    return function(req, res, next, val){
      var captures;
      if ( captures = fn.exec(String(val)) ) {
        req.params[name] = captures;
        next();
      } else {
        next('route');
      }
    }
  }
});

app.param('id', /^\d+$/ );

app.get('/spoof', function (req, res) {
	res.cookie('spoof', 'spoof_value')
	res.send();
});

app.get('/read', function (req, res) {
	// req.session = req.cookies;
    res.send(req.session);
});

app.get('/clear', function (req, res) {
	clearCookies(req, res);
	res.send();
});

// Get all posts 
app.get('/posts', handlePosts );

// Routes API
app.get('/api', function(req, res){
	res.send(app.routes);
});

app.get('*', function( req, res ){
	res.render( 'index' );
});

app.get('/', function( req, res ){
	res.render( 'index' );
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

function handlePosts (req, res) {
	if (!req.session['posts']) {
		db.call( ['select', 'posts', 'risus', 'post_date'], function(data){
			// console.log(data);
			req.session['posts'] = data;
			res.send(req.session['posts']);
		});		
	}
	else {
		console.log("hello world, session already loaded");
		res.send(req.session['posts']);
	}
}
// "select * from posts where category = 'risus'  order by post_date"  

function compare (obj1, obj2) {
	for (var key in obj1){
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}
	return true;
}


function clearCookies (req, res) {
	for (var name in req.cookies){
		res.clearCookie(name);
	}
}