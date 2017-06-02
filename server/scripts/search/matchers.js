const _ = require('underscore');
const natural = require('natural');
const tokenizer = new natural.RegexpTokenizer({pattern: /\s/});

const ESTADISTICAS_MIN_SCORE = 0.9;
const GEO_MAX_SCORE = 1;
const LEVENSHTEIN_CONFIG = {
	insertion_cost: 1,
	deletion_cost: 0.001,
	substitution_cost: 1
};

module.exports.matchGeo = function(search, tipo) {
	const cache = require('./../../cache');
	let matches = [];
	let data = cache.data[tipo];
	let tokens = tokenizer.tokenize(search);
	for(let i = 0; i < data.length; i++) {
		let words = tokenizer.tokenize(data[i].nombre);
		n_matched_words = 0;
		for(let j = 0; j < tokens.length; j++) {
			for(let k = 0; k < words.length; k++) {
				if(natural.JaroWinklerDistance(tokens[j], words[k]) >= ESTADISTICAS_MIN_SCORE) {
					n_matched_words++;
				}
			}
		}
		if(n_matched_words >= words.length) matches.push(data[i]);
	}
	return matches;
}

module.exports.matchEstadisticas = function(search, n_matches) {
	const cache = require('./../../cache');
	let matches = []; // Las estadísticas encontradas
	// Inicializa un array de {match=estadistica,score=No. keywords} vacío
	for(let i = 0; i < n_matches; i++) matches.push({estadistica: null, score: 0});
	let tokens = tokenizer.tokenize(search);
	for(let i = 0; i < cache.data.estadisticas.length; i++) {
		let score = 0; // <- Número de keywords en @search
		for(let j = 0; j < cache.data.estadisticas[i].keywords.length; j++) {
			for(let k = 0; k < tokens.length; k++) {
				// Si algún keyword se encuentra en la búsqueda -> score++
				let keyword_score = natural.JaroWinklerDistance(tokens[k],
					cache.data.estadisticas[i].keywords[j]);
				if(keyword_score >= ESTADISTICAS_MIN_SCORE) score++;
			}
		}
		// Agrega a @matches si el score es mayor que el mínimo registrado
		if(score > matches[n_matches - 1].score) {
			matches[n_matches - 1].estadistica = cache.data.estadisticas[i];
			matches[n_matches - 1].score = score;
			// Ordena descendientemente
			matches = _.sortBy(matches, (r) => { return -r.score });
		}
	}
	// Regresa solamente las estadísticas que no sean nulas
	return _.pluck(
		_.filter(matches, function(r) { return r.score > 0 }),
	'estadistica');
}
