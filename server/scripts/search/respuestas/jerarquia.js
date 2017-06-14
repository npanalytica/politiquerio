/**
 * @desc: Esta función encuentra mayores y menores en datasets
*/

const _ = require('underscore');

const LISTA_NUMERO = 15; 	// En caso de responder una pregunta como ¿Qué
							// estados tienen más dinero?, ésta es la cantidad
							// de estados que se regresan

module.exports = function(query) {
	let prop = query.subordinado == 'estados' ? 'estatal' : 'municipal';
	let jerarquia = _.sortBy(query.dataset[prop], (ds) => {
		return query.subconcepto == 'menor' ? ds.valor : -ds.valor;
	});
	if(query.cardinalidad == 'individual') {
		query.respuesta = jerarquia[0];
	} else {
		query.respuesta = jerarquia.slice(0, LISTA_NUMERO);
	}
}
