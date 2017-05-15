/**
 * @name LandingController
 * @version 0.0.1
 */

angular.module('app').controller('LandingController', [
'Rest', function(Rest) {
	var self = this;

	self.cuentas = {estadisticas: '???', datasets: '???', datos: '???'};
	self.search = '';

	Rest.add('/apiv1/cuentas/').load(function(err, result) {
		if(!err) self.cuentas = result[0];
	});

	self.updateSearch = function() {
		console.log(self.search);
	}

	console.log('API Loaded');
}]);
