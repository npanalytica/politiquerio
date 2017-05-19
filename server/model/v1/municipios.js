const DB = require('./../../dbhelpers');
const Q = require('q');

module.exports.makeSelect = function(query) {
	let sql = ["SELECT municipios.id, municipios.nombre"];
	let joins = [];

	// Estados
	if(query.estados) {
		sql.push(", estados.nombre AS estado");
		joins.push("JOIN estados ON estados.id = municipios.estado_id");
	} else {
		sql.push(", municipios.estado_id");
	}

	sql.push("FROM municipios");
	sql = sql.concat(joins);
	sql.push("WHERE TRUE");

	return sql;
}

module.exports.get = function(con, id, query) {
	query = query || {};
	let sql = module.exports.makeSelect(query);
	if(id) sql.push("AND municipios.id = ?");
	return DB.execute(con, sql.join(' '), [id]);
}
