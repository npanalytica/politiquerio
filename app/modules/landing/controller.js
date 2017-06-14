/**
 * @name LandingController
 * @version 0.0.1
 */

angular.module('app').controller('LandingController', [
'$routeParams', 'Rest',
function($routeParams, Rest) {
	var self = this;
	self.preQuery = $routeParams.prequery;
	self.cuentas = {estadisticas: '???', datasets: '???', datos: '???'};


	Rest.add('/apiv1/meta/cuentas/').load(function(err, res) {
		if(!err) {
			self.cuentas = res[0];
		}
	});

}]);
