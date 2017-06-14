/**
 * @name respuesta-display
 * @version 0.0.1
 *
**/

angular.module('app').controller('respuestaDisplayController', [
'$scope', '$sce', 'Responder', function($scope, $sce, Responder) {
	var self = this;
	self.floor = Math.floor;

	self.respuesta = 'No sé encontró una respuesta... :(';

	$scope.$watch(function() {
		return self.dataset;
	}, function(ds) {
		setRespuesta(ds);
	});

	function setRespuesta(ds) {
		if(self.ideas.concepto == 'jerarquia') {
			if(self.dataset.estatal.length==0 && self.dataset.municipal==0) {
				self.respuesta = Responder.datos(self.dataset, self.ideas,
					self.estados, self.municipios);
			} else {
				self.respuesta = Responder.jerarquia(self.dataset, self.ideas);
			}
		} else if(self.ideas.concepto == 'datos') {
			self.respuesta = Responder.datos(self.dataset, self.ideas,
				self.estados, self.municipios);
		}
	}

	self.formatFecha = function(s) {
		if(!s) return '';
		return s.substring(0, 4);
	}

}]);

angular.module('app').directive('respuestaDisplay', function() {
	return {
		restrict: 'E',
		scope: {
			ideas: '=',
			dataset: '=',
			estados: '=',
			municipios: '=',
			estadistica: '=',
		},
		controller: 'respuestaDisplayController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/components/search_bar/_respuesta_display.html'
	}
});
