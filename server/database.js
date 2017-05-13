var mysql = require('mysql');
var config = require('./config');

function Connection() {
	this.pool = null;

	// Initialize the connection
	this.init = function() {
		if(process.env.NODE_ENV == 'test') {
			this.pool = mysql.createPool(config.test_database);
		} else {
			this.pool = mysql.createPool(config.database);
		}
	};

	this.getPool = function(){
		return this.pool;
	}

	// Acquire the function
	this.acquire = function(callback) {
		this.pool.getConnection(function(err, connection){
			callback(err, connection);
		});
	}

}

module.exports = new Connection();
