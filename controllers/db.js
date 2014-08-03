var pg = require('pg');

exports.call = function(query, callback) {
	pg.connect(process.env.DATABASE_URL+"?ssl=true", function(err, client, done) {
	  if(err) {
	  	return console.error('error fetching client from pool', err);
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

