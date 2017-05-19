const DB = require('./../../dbhelpers');
const Q = require('q');

const DatosNacionales = require('./datos_nacionales');
const DatosEstatales = require('./datos_estatales');
const DatosMunicipales = require('./datos_municipales');

module.exports.makeSelect = function(query) {
	let sql = ["SELECT datasets.id, datasets.nombre, datasets.fecha, \
	datasets.fecha_upload, datasets.notas, datasets.limpia, \
	datasets.fuente_id, datasets.contribuidor_id, datasets.estadistica_id"];

	let joins = [];

	// Fuentes
	if(query.nombreFuentes) {
		sql.push(", fuentes.nombre AS fuente, \
		fuentes.descripcion AS fuente_descripcion")
		joins.push("JOIN fuentes ON fuentes.id = datasets.fuente_id");
	}

	// Contribuidor
	if(query.nombreContribuidor) {
		sql.push(", contribuidores.nombre AS contribuidor");
		joins.push("JOIN contribuidores ON contribuidores.id = \
			datasets.contribuidor_id");
	}

	// Estadistica
	if(query.nombreEstadistica) {
		sql.push(", estadisticas.nombre AS estadistica");
		joins.push("JOIN estadisticas ON estadisticas.id = \
			datasets.estadistica_id");
	}

	if(query.numeros) {
		sql.push(",(SELECT COUNT(*) FROM datos_nacionales \
			WHERE datos_nacionales.dataset_id = datasets.id) as n_nacionales");
		sql.push(",(SELECT COUNT(*) FROM datos_estatales \
			WHERE datos_estatales.dataset_id = datasets.id) as n_estatales");
		sql.push(",(SELECT COUNT(*) FROM datos_municipales \
			WHERE datos_municipales.dataset_id = datasets.id) as n_municipales");
	}

	sql.push("FROM datasets");
	sql = sql.concat(joins);
	sql.push("WHERE TRUE");

	return sql;
}

module.exports.get = function(con, id, query) {
	let sql = module.exports.makeSelect(query);
	sql.push("AND datasets.id = ?");
	return DB.execute(con, sql.join(' '), [id], 'get_one');
}

module.exports.getFromSourceAndStat = function(con, fuente_id,
estadistica_id, query) {
	let sql = module.exports.makeSelect(query);
	sql.push("AND datasets.fuente_id = ?");
	sql.push("AND datasets.estadistica_id = ?");
	return DB.execute(con, sql.join(' '), [fuente_id, estadistica_id]);
}

module.exports.getNacionales = function(con, id, query) {
	let sql = DatosNacionales.makeSelect(query);
	sql.push("AND dataset_id = ?");
	return DB.execute(con, sql.join(' '), [id]);
}

module.exports.getEstatales = function(con, id, query) {
	let sql = DatosEstatales.makeSelect(query);
	let params = [id];
	sql.push("AND dataset_id = ?");
	if(query.estados) {
		let estados = query.estados.split(',');
		sql.push("AND datos_estatales.estado_id IN")
		sql.push("(" + DB.makeQMarks(estados) + ")");
		params = params.concat(estados);
	}
	return DB.execute(con, sql.join(' '), params);
}

module.exports.getMunicipales = function(con, id, query) {
	let sql = DatosMunicipales.makeSelect(query);
	let params = [id];
	sql.push("AND dataset_id = ?");
	if(query.municipios) {
		let municipios = query.municipios.split(',');
		sql.push("AND datos_municipales.municipio_id IN")
		sql.push("(" + DB.makeQMarks(municipios) + ")");
		params = params.concat(municipios);
	} else if (query.estados) {
		let estados = query.estados.split(',');
		sql.push("AND datos_municipales.municipio_id IN");
		sql.push("(SELECT id FROM municipios WHERE estado_id");
		sql.push("IN (" + DB.makeQMarks(estados) + "))");
		params = params.concat(estados);
	}
	return DB.execute(con, sql.join(' '), params);
}
