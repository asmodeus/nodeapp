/*
* GET home page.
*/
var db = require( '../controllers/db' );

exports.getAllPostsByDate = function( req, res, category ){
	db.call("select * from posts where category = '"+category+"' order by post_date", function(data){
		res.render('main', { viewdata: data });
	});
};

exports.main = function( req, res ){
	res.render( 'index' );
};

exports.about = function( req, res ){
	// res.render( 'main',  { viewdata:  } );
};

exports.blog = function( req, res ){
	res.cookie('endpoint', 'posts', { /* add time limit */ });
	res.render( 'index' );
};

// Endpoints: /posts/:id
exports.posts = function( req, res ){
	/* Handle get and put */
	var id = req.param('id');
	if (id)
		id =  "AND post_id = '"+id+"'";
	else 
		id = "";

	db.call(endPointHandler( req, { 
			select : "select * from posts where category = 'risus' "+id+" order by post_date"  
		} ), function(data){
		res.send( data );
	});		


};


function endPointHandler(req, def){
	var def_struct = {
		select : "",
		alter : "",
		insert : "",
		delete : ""
	};

	var query = '';
	console.log(req.originalMethod);

	switch( req.originalMethod ) {
		case "GET":
			// SELECT
			query = def.select;
			break;

		case "PUT":
			// ALTER
			query = def.alter;
			break;

		case "POST":
			// INSERT
			query = def.insert;
			break;

		case "DELETE":
			// DELETE
			query = def.delete;
			break;

		default:
			throw "There was no request method!";

	}

	return query;
}