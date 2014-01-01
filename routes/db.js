 var pg = require('pg');
 var posts = [];	


exports.titles = function(){
	var conString = "postgres://toshi:pw@localhost:5432/toshi"; //used locally
	var client = new pg.Client(conString);

	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}	
	});
	var query = client.query('SELECT * from posts');

	query.on('row', function(row) {
	    	//fired once for each row returned
	    	posts.push(row);
	    });

	query.on('end', function(result) {
		console.log(result.rowCount + ' rows were received');

	});
	return posts;
};

