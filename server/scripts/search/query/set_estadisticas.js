/**
 * @desc: Éste archivo extrae las estadisticas (conceptos) del query
*/

const _ = require('underscore');
const natural = require('natural');
const cache = require('./../../../cache');
const PALABRAS_INUTILES = require('./../wordbanks/palabras_inutiles');
const KEYWORD_MIN_SCORE = 0.9;

module.exports = function(query) {
	let estadisticas = matchEstadisticas(query.tokens);
	query.mejor_estadistica = escogerMejor(estadisticas);
	query.estadisticas = _.pluck(estadisticas, 'estadistica');
}

function escogerMejor(estadisticas) {
	if(estadisticas.length == 0) return null;
	estadisticas = _.sortBy(estadisticas, function(e) {
		return e.estadistica.nombre.length;
	});
	estadisticas = _.sortBy(estadisticas, function(e) {
		return -e.score;
	});
	return estadisticas[0].estadistica;
}

function matchEstadisticas(tokens) {
	let estadisticas = [];
	for(let i = 0; i < cache.data.estadisticas.length; i++) {
		let estadistica = cache.data.estadisticas[i];
		let agregado = 0;
		for(let j = 0; j < estadistica.keywords.length; j++) {
			let keyword = estadistica.keywords[j];
			for(let k = 0; k < tokens.length; k++) {
				let score = natural.JaroWinklerDistance(keyword, tokens[k]);
				if(score >= KEYWORD_MIN_SCORE) agregado++;
			}
		}
		if(agregado > 0)
			estadisticas.push({score: agregado, estadistica: estadistica});
	}
	return estadisticas;
}
