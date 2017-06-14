/**
 * @desc: Éste archivo extrae entidades (estados y municipios) de la cadena
 * de búsqueda
*/
const _ = require('underscore');
const natural = require('natural');
const cache = require('./../../../cache');
const generarTokens = require('./generarTokens');
const PALABRAS_INUTILES = require('./../wordbanks/palabras_inutiles');
const ENTIDAD_MIN_SCORE = 0.95;

module.exports = function(query) {
	query.estados = extraerEntidades(query.tokens, 'estados');
	query.municipios = extraerEntidades(query.tokens, 'municipios');
}

function esExcepcion(target, index, tokens) {
	if(target == "bajacalifornia") {
		return tokens[index + 2] == 'sur';
	} else if (target == "mexico") {
		return tokens[index - 1] == 'ciudad';
	} else if (target == "ixtlahuacan") {
		return tokens[index + 1] == 'membrillos';
	} else if (target == "ixtlahuacan") {
		return tokens[index + 1] == 'rio';
	}
}

function extraerEntidades(tokens, tipo) {
	let entidades = [];
	for(let i = 0; i < cache.data[tipo].length; i++) {
		let ind = -1;
		let entidad_tokens = generarTokens(cache.data[tipo][i].nombre);
		let target = entidad_tokens.join('');
		for(let j = 0; j < tokens.length - entidad_tokens.length + 1; j++) {
			let substr = tokens.slice(j, j + entidad_tokens.length).join('');
			let score = natural.JaroWinklerDistance(substr, target);
			if(score >= ENTIDAD_MIN_SCORE) {
				if(!esExcepcion(target, j, tokens)) {
					entidades.push(cache.data[tipo][i]);
					ind = j;
					encontrado = true;
				}
			}
		}
	}
	return entidades;
}
