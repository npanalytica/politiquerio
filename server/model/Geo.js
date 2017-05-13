const DB = require('./../dbhelpers');
const Q = require('q');
const _ = require('underscore');

function getMunicipios(con, query) {
	let sql = "select id, estado_id, nombre from municipios";
	if(query.estado_id) sql += " where estado_id = ?";
	return DB.execute(con, sql, [query.estado_id]);
}
module.exports.getMunicipios = getMunicipios;

function getEstados(con, query) {
	let sql = "select id, nombre from estados";
	if(query.id) sql += " where id = ?";
	return DB.execute(con, sql, [query.id]);
}
module.exports.getEstados = getEstados;

function getEstadosMunicipios(con, query) {
	let d = Q.defer();
	let pEstados = getEstados(con, query);
	let pMunicipios = getMunicipios(con, query);
	Q.all([pEstados, pMunicipios]).then((result) => {
		let estados = result[0];
		let municipios = _.groupBy(result[1], 'estado_id');
		estados.forEach((e) => {
			e.municipios = municipios[e.id];
		});
		d.resolve(estados);
	}).catch((err) => {
		d.reject(err);
	});
	return d.promise;
}
module.exports.getEstadosMunicipios = getEstadosMunicipios;
