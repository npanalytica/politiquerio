const _ = require('underscore');
const Q = require('q');
const connection = require('./database');

function execute(con, sql, params, type) {
	let d = Q.defer();
	con.query(sql, params, function(err, data) {
		if(err) {
			d.reject(err);
		} else {
			if(type == 'get_one')
				data = data.length == 1 ? data[0] : null;
			d.resolve(data);
		}
	})
	return d.promise;
}
module.exports.execute = execute;

module.exports.makeQMarks = function(arr) {
	return Array.apply(null, Array(arr.length))
		.map(String.prototype.valueOf, '?').join(',');
}

/**
 * @param {function} func - A function to execute within a transaction
 * @param {argv} args - Arguments to apply to the function
 *		@NOTE: @func always takes a transaction object as its first parameter
*/
module.exports.respond = function(res, func, argv) {
	connection.acquire(function(err, con) {
		if(err) {
			res.status(500).send();
			con.release();
		} else {
			con.beginTransaction(function(err) {
				if(err) {
					res.status(500).send();
					con.rollback(); con.release();
				} else {
					let args = [con].concat(argv);
					func.apply(null, args).then(function(data) {
						let return_data = data;
						if(!isNaN(parseFloat(data))) data += '';
						res.status(200).send(data);
					}).catch(function(err) {
						console.log(err);
						let status = 500;
						if(err.code == 'ER_BAD_FIELD_ERROR') {
							status = 901;
						} else {
							status = isNaN(err) ? 500 : err;
						}
						res.sendStatus(status).end();
					}).done(function() {
						if(process.env.NODE_ENV == 'test') { con.rollback() };
						con.release();
					});
				}
			})
		}
	})
}
