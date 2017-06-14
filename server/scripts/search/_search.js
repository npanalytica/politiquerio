const Q = require('q');

let cache = require('./../../cache');

const generarQuery = require('./query/_generar');
const setDataset = require('./database/set_dataset');
const responder = require('./respuestas/_responder');

const N_ESTADISTICAS = 5;

module.exports = function(con, search) {
	let d = Q.defer();
	let query = generarQuery(search);
	if(query.estadisticas.length == 0) {
		d.reject(404);
	} else {
		setDataset(con, query).then((query) => {
			responder(query);
			return Q(query);
		}).then((query) => {
			query.estadisticas = query.estadisticas.splice(1, N_ESTADISTICAS + 1);
			d.resolve(query);
		}).catch((err) => {
			d.reject(err);
		});
	}
	return d.promise;
}
