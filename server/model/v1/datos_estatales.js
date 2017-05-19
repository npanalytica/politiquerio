const DB = require('./../../dbhelpers');

module.exports.makeSelect = function(query) {
	let sql = ["SELECT datos_estatales.valor, datos_estatales.estado_id, \
		datos_estatales.dataset_id"];
	let joins = [];

	if(query.nombreEstados) {
		sql.push(", estados.nombre AS estado");
		joins.push("JOIN estados on estados.id = datos_estatales.estado_id");
	}

	sql.push("FROM datos_estatales");

	sql = sql.concat(joins);
	sql.push("WHERE TRUE");

	return sql;
}

module.exports.getHistory = function(con, fuente_id, estadistica_id,
query) {
	let sql = module.exports.makeSelect(query);
	let params = [fuente_id, estadistica_id];
	let joins = [];

	sql.push("AND dataset_id IN (SELECT id FROM datasets \
		WHERE fuente_id = ? AND estadistica_id = ?)");

	if(query.estados) {
		let estados = query.estados.split(',');
		sql.push("AND datos_estatales.estado_id IN");
		sql.push("(" + DB.makeQMarks(estados) + ")");
		params = params.concat(estados);
	}
	return DB.execute(con, sql.join(' '), params);
}
