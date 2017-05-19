module.exports.guessType = function(estados, municipios) {
	if(municipios.length + estados.length == 0) {
		return 'nacional';
	} else if(municipios.length >= estados.length) {
		return 'municipal';
	} else {
		return 'estatal';
	}
}
