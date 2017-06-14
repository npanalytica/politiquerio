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

module.exports.get = function(con, id, query) {
	let d = Q.defer();
	let sql = module.exports.makeSelect(query);
	if(id) sql.push("AND fuentes.id = ?");
	return DB.execute(con, sql.join(' '), [id]);
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
