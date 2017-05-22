const _ = require('underscore');

module.exports.guessType = function(estados, municipios) {
	if(municipios.length + estados.length == 0) {
		return 'nacional';
	} else if(municipios.length > estados.length) {
		return 'municipal';
	} else {
		return 'estatal';
	}
}

function allMunsInStates(estados, municipios) {
	let e = _.pluck(estados, 'id');
	let m = _.uniq(_.pluck(municipios, 'estado_id'));
	return _.difference(m, e).length == 0;
}
