const _ = require('underscore');
const Q = require('q');
const DB = require('./../../dbhelpers');

module.exports.get = function(con, id, query) {
	let sql = "SELECT * FROM temas WHERE id = ?";
	return DB.execute(con, sql, [id]);
}

module.exports.list = function(con, query) {
	let sql = "SELECT * FROM temas";
	return DB.execute(con, sql);
}

module.exports.getOpiniones = function(con, id, query) {
	let sql = "SELECT * FROM temas_opiniones WHERE tema_id = ?";
	return DB.execute(con, sql, [id]);
}
