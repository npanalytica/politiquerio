const DB = require('./../../dbhelpers');

module.exports.makeSelect = function(query) {
	let sql = ["SELECT datos_municipales.valor, \
		datos_municipales.municipio_id, datos_municipales.dataset_id"];
	let joins = [];

	if(query.nombreMunicipios) {
		sql.push(", municipios.nombre AS municipio");
		joins.push("JOIN municipios ON \
			municipios.id = datos_municipales.municipio_id");
	}

	sql.push("FROM datos_municipales");
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

	if(query.municipios) {
		let municipios = query.municipios.split(',');
		sql.push("AND datos_municipales.municipio_id IN");
		sql.push("(" + DB.makeQMarks(municipios) + ")");
		params = params.concat(municipios);
	}
	return DB.execute(con, sql.join(' '), params);
}
