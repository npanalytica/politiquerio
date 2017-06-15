/**
 * @name EstadisticasController
 * @version 0.0.1
 */

angular.module('app').controller('EstadisticasController', [
'Rest', 'Helpers', '$routeParams',
function(Rest, Helpers, $routeParams) {

	var self = this;
	self.httpStatus = 2;
	self.pagination = Helpers.generatePagination(0, 10, 20);

	self.formatFecha = function(s) { return s.substring(0, 4); }

	var url = '/apiv1/estadisticas/' + $routeParams.id;
	Rest.add(url).add(url + '/datasets?nombreFuentes=true&nombreContribuidor=true&numeros=true')
	.load(function(err, res) {
		if(err)  {
			self.httpStatus = 1;
		} else {
			self.httpStatus = 0;
			self.estadistica = res[0][0];
			self.estadistica.datasets = res[1];
			self.pagination.update(res[1].length);
		}
	});

}]);
