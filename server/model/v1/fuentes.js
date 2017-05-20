const _ = require('underscore');
const Q = require('q');
const DB = require('./../../dbhelpers');

const DatosNacionales = require('./datos_nacionales');
const DatosEstatales = require('./datos_estatales');
const DatosMunicipales = require('./datos_municipales');
const Datasets = require('./datasets');

module.exports.makeSelect = function(query) {
	let sql = ["SELECT fuentes.id, fuentes.nombre, fuentes.descripcion, \
		fuentes.url, fuentes.facebook, fuentes.twitter FROM fuentes WHERE TRUE"];
	return sql;
}

module.exports.getHistory = function(con, type, id, stat_id, query) {
	let d = Q.defer();
	query.nombreFuentes = true;
	query.numeros = true;
	let pDatasets = Datasets.getFromSourceAndStat(con, id, stat_id,
		query).then((res) => { return Q(res) });

	let dataFunc = null;

	switch(type) {
		case 'nacional':  dataFunc 	= 	DatosNacionales.getHistory; break;
		case 'estatal':   dataFunc 	= 	DatosEstatales.getHistory; break;
		case 'municipal': dataFunc 	= 	DatosMunicipales.getHistory; break;
	}

	pData = dataFunc(con, id, stat_id, query).then((res) => { return Q(res) });

	Q.all([pDatasets, pData]).then((res) => {
		let ds_data = _.groupBy(res[1], 'dataset_id');
		let datasets = res[0];
		/*if(type != 'nacional') {
			let fk = type == 'estatal' ? 'estado_id' : 'municipio_id';
			for(key in ds_data) ds_data[key] = _.groupBy(ds_data[key], fk);
		}*/

		let history = [];
		for(let i = 0; i < datasets.length; i++) {
			if(ds_data[datasets[i].id]) {
				datasets[i].datos = ds_data[datasets[i].id];
				history.push(datasets[i]);
			}
		}
		history = _.sortBy(history, (h) => { return h.fecha });
		d.resolve(history);
	}).catch((err) => {
		d.reject(err);
	});
	return d.promise;
}
