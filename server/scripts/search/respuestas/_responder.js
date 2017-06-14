/**
 * @desc: Esta función genera una respuesta concreta a la pregunta del usuario
*/

const Jerarquia = require('./jerarquia');

module.exports = function(query) {
	switch(query.concepto) {
		case 'jerarquia':
			Jerarquia(query);
			break;
	}
}
