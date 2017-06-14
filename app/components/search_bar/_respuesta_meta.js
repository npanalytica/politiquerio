/**
 * @name respuesta-meta
 * @version 0.0.1
 *
**/

angular.module('app').controller('respuestaMetaController', ['Entidades',
function(Entidades) {

	var self = this;

	self.links = ['respuesta', 'tabla', 'mapa', 'histórico'];

	self.setDisplay = function(d) { self.display = d; }

}]);

angular.module('app').directive('respuestaMeta', function() {
	return {
		restrict: 'E',
		scope: {
			estadisticas: '=',
			display: '='
		},
		controller: 'respuestaMetaController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/components/search_bar/_respuesta_meta.html'
	}
});
