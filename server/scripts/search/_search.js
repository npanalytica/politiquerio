const _ = require('underscore');
const Q = require('q');
const DB = require('./../../dbhelpers');
const cache = require('./../../cache');
const natural = require('natural');
const tokenizer = new natural.RegexpTokenizer({pattern: /\s/});
const Matchers = require('./matchers');
const Queries = require('./queries');
const Guesses = require('./guesses');

const MINSCORE = 0.95;
const N_RES = 5;

module.exports = function(con, string) {
	let d = Q.defer();

	let tokens = tokenizer.tokenize(string);

	let estados = Matchers.getMatchArray(MINSCORE, tokens, cache.data.estados);
	let municipios = Matchers.getMatchArray(MINSCORE, tokens, cache.data.municipios);
	let estadisticas = Matchers.getMatches(N_RES, tokens, cache.data.estadisticas);
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
