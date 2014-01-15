var pg = require('pg');
var client;

exports.createConnection = function() {
	client = new pg.Client("postgres://toshi:pw@localhost:5432/toshi");
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}	
	});	
};

exports.dbCall = function(query, callback) {
	var data = [];
	var query = client.query(query);
	query.on('row', function(row) {
    	data.push(row);
    });
	query.on('end', function(result) {
		console.log(result.rowCount + ' rows were received');
		callback(data);
	});
};

