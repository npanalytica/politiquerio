const _ = require('underscore');
const Q = require('q');
const DB = require('./../../dbhelpers');
const Datasets = require('./datasets');
const Fuentes = require('./fuentes');

module.exports.makeSelect = function(query) {
	let sql = ["SELECT estadisticas.id, estadisticas.nombre"];
	let joins = [];

	// Estados
	if(query.subgrupos) {
		sql.push(", subgrupos.nombre AS subgrupo");
		joins.push("JOIN subgrupos ON subgrupos.id = estadisticas.subgrupo_id");
	} else {
		sql.push(", estadisticas.subgrupo_id");
	}

	sql.push("FROM estadisticas");
	sql = sql.concat(joins);
	sql.push("WHERE TRUE");

	return sql;
}

module.exports.get = function(con, id, query) {
	let sql = module.exports.makeSelect(query);
	if(id) sql.push("AND estadisticas.id = ?");
	return DB.execute(con, sql.join(' '), [id]);
}

module.exports.getDatasets = function(con, id, query) {
	let sql = Datasets.makeSelect(query);
	sql.push("AND datasets.estadistica_id = ?");
	return DB.execute(con, sql.join(' '), [id]);
}

module.exports.getFuentes = function(con, id, query) {
	let sql = Fuentes.makeSelect(query);
	sql.push("AND fuentes.id IN \
		(SELECT fuente_id FROM datasets WHERE estadistica_id = ?)");
	return DB.execute(con, sql.join(' '), [id]);
}

module.exports.getStatesHistory = function(con, id, fuente_id, query) {
	return Fuentes.getStatesHistory(con, fuente_id, id, query);
}
