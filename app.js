/**
 * App Dependencies.
 */
 var express = require("express");
 var http = require("http");
 var path = require("path");
 var src = sortByDate(JSON.parse(require("fs").readFileSync("sources.json", "UTF-8")));
 var app = express();

// all environments
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser("hi-github"));
app.use(express.session());
app.use(express.static(path.join(__dirname, "public")));
app.use(app.router);

// development only
if ( "development" == app.get("env") ) {
	app.use(express.errorHandler());
}

// do request if regex match
// app.param("", /^\d+$/ );
app.param(function(name, fn){
	if (fn instanceof RegExp) {
		return function(req, res, next, val){
			var captures;
			if (captures = fn.exec(String(val))) {
				req.params[name] = captures;
				next();
			} else {
				next('route');
			}
		}
	}
});

// create post endpoints
src.forEach(function(post) {

	var d = new Date(post.date);

	var url = "/"+d.getFullYear().toString()+"/"+d.getMonth().toString()+"/"+d.getDay().toString()+"/"+post.title.replace(/ /g, '-').toLowerCase();
	post.url = url;

	app.get(url, function( req, res ){
		res.render("entry", {"post" : post});
	});

});

// go to archive
app.get("/", function( req, res ){
	res.redirect("/archive");
});

// static about
app.get("/about", function( req, res ){
	res.render( "about" );
});

// index
app.get("/archive", function( req, res ){
	res.render( "index", { "data" : src } );
});

// TODO: Refactor tags into one get with regex function
// index
app.get("/tags/ideas", function( req, res ){
	res.render("index", { "data" : getByTag(src, "ideas") });
});

// index
app.get("/tags/animations", function( req, res ){
	res.render("index", { "data" : getByTag(src, "animations") });
});

// index
app.get("/tags/games", function( req, res ){
	res.render("index", { "data" : getByTag(src, "games") });
});

// index
app.get("/tags/about", function( req, res ){
	res.render("index", { "data" : getByTag(src, "about") });
});

// get all tags
app.get("/tags", function( req, res ){
	// TODO: Weighted tags
	res.render("tags", { "data" : getAllTags(src) });
});

// everything else is a 404
app.get("*", function( req, res ){
	res.status(404).render("404");
});

http.createServer(app).listen(app.get("port"), function(){
	console.log("Express server listening on port " + app.get("port"));
});


function getByTag (sources, search_tag){

	return sources.map(function(post) {

		var hasTag = post.tags.some(function(tag){
			return tag === search_tag;
		})

		if (hasTag) {
			return post;
		}

	}).filter(function(e){return e}); // clean empty entries

}

function sortByDate(sources){

	return sources.sort(function(prev, next){
		var pdate = new Date(prev.date),
			ndate = new Date(next.date);

		if (pdate >= ndate) {
			return -1;
		}

		else if (pdate === ndate) {
			return 0;
		}

		else  {
			return 1;
		}

	});

}

function getAllTags(sources){

	var all_tags = [];

	sources.map(function(post) {

		post.tags.map(function(tag) {
			
			if ( all_tags.indexOf(tag) === -1) {
				all_tags.push(tag);
			}

		});
		
	});

	return all_tags;

}

// getAllTags(src);

// Cookie handling
// app.get("/read", function (req, res) {
// 	res.send(req.cookies);
// });

// // Set cookies
// app.get("/set", function (req, res) {
// 	res.cookie("cookie", "cookie_info");
// 	res.send("Cookie is now saved in the next response");
// });

// // Clear cookies
// app.get("/clear", function (req, res) {
// 	clearCookies(req, res);
// 	res.send("Cookie was cleared, read to see result");
// });

// function clearCookies (req, res) {
// 	for (var name in req.cookies){
// 		res.clearCookie(name);
// 	}
// }