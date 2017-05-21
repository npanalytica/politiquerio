const _ = require('underscore');
const Q = require('q');
const DB = require('./../../dbhelpers');
const Matchers = require('./matchers');
const Queries = require('./queries');
const Guesses = require('./guesses');

const MINSCORE = 0.95;
const N_RES = 5;

module.exports = function(con, string) {
	let d = Q.defer();

	string = string.replace(/\,/g, '');

	let estados = Matchers.matchGeo(string, 'estados');
	let municipios = Matchers.matchGeo(string, 'municipios');
	let estadisticas = Matchers.matchEstadisticas(string, 10);
	let type = Guesses.guessType(estados, municipios);
	Q.fcall(Queries.getBestSources, con, estadisticas, type).then((fuentes) => {
		let d2 = Q.defer();
		let promises = [];
		for(var i = 0; i < estadisticas.length; i++) {
			promises.push(Queries.loadHistory(con, type, fuentes[i].id,
				estadisticas[i].id, estados, municipios));
		}
		Q.all(promises).then((res) => {
			let data = _.filter(res, (d) => { return d.length > 0 });
			let geo = null;
			if(type == 'estatal') { geo = estados } else
			if(type == 'municipal') { geo = municipios }
			d2.resolve({type: type, data: data, geo: geo});
		}).catch((err) => {
			d2.reject(err);
		});
		return d2.promise;
	}).then((data) => {
		d.resolve(data);
	}).catch((err) => {
		d.reject(err);
	});

	return d.promise;
}
