/**
 * @desc: Esta función encuentra el mejor dataset a partir de @query y lo llena
 * de datos
*/

const _ = require('underscore');
const Q = require('q');
const Estadisticas = require('./../../../model/v1/estadisticas');
const Datasets = require('./../../../model/v1/datasets');

module.exports = function(con, query) {
	return setDataset(con, query);
}

function setDataset(con, query) {
	let d = Q.defer();
	Estadisticas.getDatasets(con, query.mejor_estadistica.id, {numeros:true, nombreFuentes:true})
	.then((res) => {
		// Encuentra el mejor dataset para query.mejor_estadistica
		// En caso de que éste no exista, cambia a la segunda mejor estadística
		// y RECURSIOOOOOON
		query.dataset = mejorDataset(query, res);
		query.datasets = res;
		if(query.dataset === null) {
			query.mejor_estadistica = query.estadisticas.shift();
			return setDataset(con, query);
		} else {
			return Q(query);
		}
	}).then((query) => {
		let d_set = Q.defer();
		let qry = {nombreEstados:true, nombreMunicipios:true};
		let promesas = _.map(query.datasets, (ds) => {
			return Datasets.getDatos(con, ds.id, qry).then((res) => {
				return Q(res);
			})
		});

		Q.all(promesas).then((res) => {
			for(var i = 0; i < query.datasets.length; i++) {
				query.datasets[i].nacional = res[i].nacional;
				query.datasets[i].estatal = res[i].estatal;
				query.datasets[i].municipal = res[i].municipal;
			}
			d_set.resolve(query);
		}).catch((err) => {
			d_set.reject(err);
		});
		return d_set.promise;
	}).then((query) => {
		d.resolve(query);
	}).catch((err) => {
		d.reject(err);
	});
	return d.promise;
}

/** @desc: Encuentra el mejor dataset para el query */
function mejorDataset(query, datasets) {
	// Encuentra los más confiables
	let _datasets = _.sortBy(datasets, (ds) => { return -ds.confianza });
	// Encuentra los más recientes
	_datasets = _.sortBy(datasets, (ds) => {
		return Math.abs(ds.fecha.getFullYear() - query.fecha);
	});
	// En caso de que el query pida datos estatales o municipales,
	// encuentra el mejor dataset que tiene ésos datos
	if(query.ideas.subordinado == 'estados' ||
	query.ideas.subordinado == 'municipios') {
		let prop = query.ideas.subordinado == 'estados' ?
			'n_estatales' : 'n_municipales';
		for(let i = 0; i < _datasets.length; i++) {
			if(_datasets[i][prop] > 0) return _datasets[i];
		}
	} else {
		return _datasets[0];
	}
	return null;
}
