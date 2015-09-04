/**
 * App Dependencies.
 */
 var express = require("express");
 var http = require("http");
 var path = require("path");
 var sources = sortByDate(JSON.parse(require("fs").readFileSync("sources.json", "UTF-8")));
 var app = express();

// all environments
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
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

app.param("tag", /^\w+$/ );
app.get("/tags/:tag", function( req, res ){
	res.render("index", { "data" : getByTag(sources, req.params.tag.input) });
});


// go to archive
app.get("/", function( req, res ){
	res.redirect("/archive");
});

// index
app.get("/archive", function( req, res ){
	res.render( "index", { "data" : sources } );
});

// static about
app.get("/about", function( req, res ){
	res.render( "about" );
});

// get all tags
app.get("/tags", function( req, res ){
	res.render("tags", { "data" : getAllTags(sources) });
});

app.get("/animations", function( req, res ){
	res.render("index", { "data" : getByTag(sources, "animation") });
});


// create post endpoints
sources.forEach(function(post) {

	var d = new Date(post.date);

	post.url = "/"+d.getFullYear()+"/"+d.getMonth()+"/"+d.getDay()+"/"+post.title.replace(/ /g, '-').toLowerCase();

	app.get(post.url, function( req, res ){
		res.render("blogentry", {"post" : post});
	});

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

	var all_tags = {};

	sources.map(function(post) {

		post.tags.map(function(tag) {
			if ( !(tag in all_tags) ) {
				all_tags[tag] = { num : 1 };
			}
			else 
				all_tags[tag].num++;
		});
		
	});

	return all_tags;

}

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