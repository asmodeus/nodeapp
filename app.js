/**
 * Module dependencies.
 */
 var express = require('express');
 var http = require('http');
 var path = require('path');
 var routes = require('./routes/routes');
 var app = express();
 var db = require('./controllers/db');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ( 'development' == app.get('env') ) {
	app.use(express.errorHandler());
}

// Get posts with id param 
app.get('/posts/:id', routes.posts );
// Get all posts 
app.get('/posts', routes.posts );

// Routes API
app.get('/api', function(req, res){
	res.send(app.routes);
});

app.get('*', routes.main );

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

