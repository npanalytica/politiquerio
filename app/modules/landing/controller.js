/**
 * @name LandingController
 * @version 0.0.1
 */

angular.module('app').controller('LandingController', [
'Rest', function(Rest) {
	var self = this;

	self.cuentas = {estadisticas: '???', datasets: '???', datos: '???'};

	Rest.add('/apiv1/meta/cuentas/').load(function(err, res) {
		if(!err) {
			self.cuentas = res[0];
		}
	});

}]);
