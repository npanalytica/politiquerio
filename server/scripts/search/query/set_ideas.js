/**
 * @desc: Ésta función extrae (y elimina) todos los conceptos de cantidad,
 * comparación, jerarquía, etc... de la cadena de búsqueda.
*/

const _ = require('underscore');
const natural = require('natural');
const IDEAS = require('./../wordbanks/ideas');

const IDEA_MIN_SCORE = 1;

module.exports = function(query) {
	let nuevos_tokens = []; // Todos los tokens que NO SON IDEAS
	let ideas = [];
	// Extrae todas las ideas que se puedan (cuantos, quien, donde, etc...)
	query.tokens.forEach((t) => {
		let token_es_idea = false;
		for(c in IDEAS.IDEAS) {
			let score = natural.JaroWinklerDistance(t, c);
			if(score >= IDEA_MIN_SCORE) {
				ideas = ideas.concat(IDEAS.IDEAS[c]);
				token_es_idea = true;
			}
		}
		if(!token_es_idea) nuevos_tokens.push(t);
	});

	// Agrupa éstas ideas en sus abstractos, y por cada uno escoge solamente
	// la idea que tenga la mayor incidencia
	query.ideas = {};
	for(_abstracto in IDEAS.ABSTRACTOS) {
		let _ideas = _.intersection(IDEAS.ABSTRACTOS[_abstracto], ideas);
		if(_ideas.length == 0) {
			query.ideas[_abstracto] = IDEAS.ABSTRACTOS[_abstracto][0];
		} else {
			query.ideas[_abstracto] =
				_.chain(_ideas).countBy().pairs().max(_.last).head().value();
		}
	}
	// Sujeto...
	if(query.estados.length == 0 && query.municipios.length == 0) {
		if(!_.contains(['estados', 'municipios'], query.ideas.subordinado))
			query.ideas.subordinado = 'pais';
	} else if (query.municipios.length >= query.estados.length) {
		query.ideas.subordinado = 'municipios';
	} else {
		query.ideas.subordinado = 'estados';
	}
	query.tokens = nuevos_tokens;
}
