const _ = require('underscore');
const Q = require('q');

const Estadisticas = require('./../../model/v1/estadisticas');
const Fuentes = require('./../../model/v1/fuentes');

/** @desc: toma un array de estadísticas y carga sus datasets en @dataset **/
module.exports.getBestSources = function(con, estadisticas, type) {
	let d = Q.defer();

	let promises = [];

	for(let i = 0; i < estadisticas.length; i++) {
		let id = estadisticas[i].id
		promises.push(Estadisticas.getFuentes(con,id).then((q)=>{return Q(q[0])}));
	}

	Q.all(promises).then((sources) => {
		d.resolve(sources);
	}).catch((err) => {
		d.reject(err);
	})

	return d.promise;
}

module.exports.loadHistory = function(con, type, fuente_id, estadistica_id,
estados, municipios) {
	let query = {
		nombreEstados: true,
		nombreFuentes: true,
		nombreEstadistica: true,
	};
	if(type == 'estatal') {
		query.estados = _.pluck(estados, 'id').join(',');
	} else if (type == 'municipal') {
		query.municipios = _.pluck(municipios, 'id').join(',');
	}
	return Fuentes.getHistory(con, type, fuente_id, estadistica_id, query);
}
