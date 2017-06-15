/**
 * @name BuscarController
 * @version 0.0.1
 */

angular.module('app').controller('SubgruposController', [
'Rest', 'Helpers', '$routeParams',
function(Rest, Helpers, $routeParams) {

	var self = this;
	self.httpStatus = 2;
	self.pagination = Helpers.generatePagination(0, 10, 20);

	var url = '/apiv1/subgrupos/' + $routeParams.id + '?estadisticas=true&numeros=true';

	Rest.add(url).load(function(err, res) {
		if(err)  {
			self.httpStatus = 1;
		} else {
			self.httpStatus = 0;
			self.subgrupo = res[0][0];
			self.pagination.update(res[0][0].estadisticas.length);
		}
	});

}]);
