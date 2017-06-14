/**
 * @desc: Esta función genera un objeto de búsqueda como el descrito en:
 * https://github.com/npanalytica/politiquerio/<<LINK>>
*/
const generarTokens = require('./generarTokens');
const setEntidades = require('./set_entidades');
const setEstadisticas = require('./set_estadisticas');
const setFecha = require('./set_fecha');
const setIdeas = require('./set_ideas');

module.exports = function(texto) {
	let query = {};
	query.original = texto;
	query.tokens = generarTokens(texto);
	setEntidades(query);
	setIdeas(query);
	setFecha(query);
	setEstadisticas(query);
	return query;
}
