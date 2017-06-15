/**
 * @name BuscarController
 * @version 0.0.1
 */

angular.module('app').controller('GruposController', [
'Rest', 'Helpers', '$routeParams',
function(Rest, Helpers, $routeParams) {

	var self = this;
	self.httpStatus = 2;
	self.pagination = Helpers.generatePagination(0, 10, 20);

	var url = '/apiv1/grupos';
	if($routeParams.id) {
		url += '/' + $routeParams.id + '?subgrupos=true&numeros=true';
	} else {
		url += '?numeros=true'
	}
	Rest.add(url).load(function(err, res) {
		if(err)  {
			self.httpStatus = 1;
		} else {
			self.httpStatus = 0;
			if($routeParams.id) {
				self.grupo = res[0][0];
				console.log(self.grupo);
				self.pagination.update(self.grupo.subgrupos.length);
			} else {
				self.pagination.update(res[0].length);
				self.grupos = res[0];
			}
		}
	});

}]);
