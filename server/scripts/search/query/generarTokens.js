const _ = require('underscore');
const natural = require('natural');
const tokenizer = new natural.RegexpTokenizer({pattern: /\s/});
const quitarAcentos = require('diacritics').remove;
const PALABRAS_INUTILES = require('./../wordbanks/palabras_inutiles');

module.exports = function(texto) {
	// Quita mayúsculas, acentos, y caracteres especiales
	let limpio = texto.toLowerCase();
	limpio = quitarAcentos(limpio);
	limpio = limpio.replace(/[^\s0-9a-zA-Z_]/g, '');
	// Quita todas las palabras inútiles
	let palabras = tokenizer.tokenize(limpio);
	let utiles = _.difference(palabras, PALABRAS_INUTILES);
	return utiles;
}
