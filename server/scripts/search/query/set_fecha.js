/**
 * @desc: Éste archivo extrae la fecha (actualmente el año) de un search string
*/
const _ = require('underscore');
const natural = require('natural');
const tokenizer = new natural.RegexpTokenizer({pattern: /\s/});

const THIS_YEAR = 2017;

module.exports = function(query) {
	let fechas = _.filter(query.tokens, (t) => { return !isNaN(t); });
	query.tokens = _.difference(query.tokens, fechas);
	query.fecha = fechas.length > 0 ? fechas[0] : THIS_YEAR;
}
