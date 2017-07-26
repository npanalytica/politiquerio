/**
 * @name PersonaController
 * @version 0.0.1
 */

angular.module('app').controller('PersonaController', [
'Rest', 'Helpers', '$routeParams',
function(Rest, Helpers, $routeParams) {

	var self = this;

	self.entidad = {
		id: 1,
		nombre: 'Enrique Peña Nieto',
		cargo: 'Presidente de México',
		partido: 'PRI',
	}

}]);
