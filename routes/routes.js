var db = require( '../controllers/db' );


/*
* GET home page.
*/
exports.main = function( req, res ){
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

	db.call(queryConstructor( req, { 
				select : "select * from posts where category = 'risus' "+id+" order by post_date"  
			} ), function(data){
		res.send( data );
	});		
};


function queryConstructor(req, def){
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