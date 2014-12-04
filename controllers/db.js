var pg = require('pg');

exports.call = function(query, callback) {
	pg.connect(process.env.DATABASE_URL+"?ssl=true", function(err, client, done) {
	  if(err) {
	  	return console.error('error fetching client from pool', err);
	  }
	  if ( query instanceof Array ){
	  	query = queryConstructor.apply(this, query);
	  }
	  
	  client.query(query, function(err, result) {
	    //call `done()` to release the client back to the pool
	    done();
	    
	    if(err) {
	      return console.error('error running query', err);
	    }
		console.log(result.rowCount + ' rows were received');
	    callback(result.rows);
	  });
	});
};

function queryConstructor (method, table, where, order ){
	where = where ? "" : " WHERE CATEGORY = '"+where+"'";
	order = order ? "" : " ORDER BY "+order;
	return method+" * FROM "+table+where+order;
}