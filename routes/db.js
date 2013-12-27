 var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

exports.timenow = function(){

	var conString = process.env.DATABASE_URL || "postgres://toshi:pw@localhost:5432/toshi";

	var client = new pg.Client(conString);
	var ret = [];

	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		client.query('SELECT * from products', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			console.log(result.rows);
			ret = result.rows;
		// return result.rows[0].theTime;
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
		});
	});

	if (ret) { return ret;}

};