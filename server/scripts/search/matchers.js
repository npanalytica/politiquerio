const _ = require('underscore');
const natural = require('natural');
const tokenizer = new natural.TreebankWordTokenizer();

/**
 * @desc: regresa todos los objetos de @array[@prop] que aparecen en @words
 * y cuya distancia JaroWinkler es menor que @cutoff
 * @param {int} cuttoff - El score mínimo que tiene que tener un match
 * @param {str} words - El arreglo de palabras a comparar
 * @param {arr} array - Arreglo que contiene los objetos a comparar
 * @param {prop} prop - La propiedad dentro de cada elemento de @array que
 *						usará para obtener el @needle
 * NOTE: Útil para encontrar matches de palabra vs frase. (e.g, "Guadalajara" vs
 * "homicidios en Guadalajara, Jalisco")
*/
function getMatchArray(cutoff, words, array, prop) {
	prop = prop || 'nombre';
	let matches = [];
	for(let i = 0; i < array.length; i++) {
		let score = getMaxScore(words, array[i][prop]);
		if(score > cutoff) matches.push(array[i]);
	}
	return matches;
}
module.exports.getMatchArray = getMatchArray;

/**
 * @desc: regresa un arreglo sorteado de los objetos más parecidos a @words
 * @param {int} n_matches - El tamaño del arreglo a regresar
 * @param {str} words - El arreglo de palabras a comparar cada @needle
 * @param {arr} array - Arreglo que contiene los objetos a comparar
 * @param {prop} prop - La propiedad dentro de cada elemento de @array que
 *						usará para obtener el @needle
 * NOTE: Útil para encontrar matches de frase vs frase. (e.g, "homicidios de
 * muejeres en Chihuahua" vs "tasa de defunciones por homicidio. Mujer")
*/
function getMatches(n_matches, words, array, prop) {
	prop = prop || 'nombre';
	let guesses = [];
	for(var i = 0; i < n_matches; i++) guesses.push({obj: null, score: 0});
	for(let i = 0; i < array.length; i++) {
		let new_score = getScore(words, array[i][prop]);
		if(new_score > guesses[n_matches - 1].score) {
			guesses[n_matches - 1] = {obj: array[i], score: new_score};
			guesses = _.sortBy(guesses, (g) => { return -g.score });
		}
	}
	return _.pluck(guesses, 'obj'); // No regresar scores
}
module.exports.getMatches = getMatches;


/**
 * @desc: regresa el máximo score de JaroWinkler de @target en @words
 * NOTE: Útil para encontrar UNA SOLA palabra en un needle (e.g,
 * 'Asesinatos en Guadalajara' -> Guadalajara)
*/
function getMaxScore(words, target) {
	let score = 0;
	for(let i = 0; i < words.length; i++) {
		let new_score = natural.JaroWinklerDistance(target, words[i]);
		if(new_score > score) score = new_score;
	}
	return score;
}


/**
 * @desc: regresa el score de JaroWinkler de @target en @words
 * NOTE: Útil para encontrar MÚLTIPLES PALABRAS palabra en un needle (e.g,
 * 'tasa de homicidios en Jalisco' -> 'tasa de homicidios')
*/
function getScore(words, target) {
	let score = 0;
	let needles = tokenizer.tokenize(target);
	for(let i = 0; i < words.length; i++) {
		for(let j = 0; j < needles.length; j++) {
			let new_score = natural.JaroWinklerDistance(needles[j], words[i]);
			// Ignora palabras que no son muy parecidas
			if(new_score > 0.8) score += new_score;
		}
	}
	// Penaliza al score entre más grande sea
	return (score/needles.length);
}
