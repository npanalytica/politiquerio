/**
 * @name DatasetsController
 * @version 0.0.1
 */

angular.module('app').controller('DatasetsController', [
'Rest', 'Helpers', 'DatasetHelpers', '$routeParams',
function(Rest, Helpers, Dataset, $routeParams) {

	var self = this;
	self.httpStatus = 2;
	self.display = null;
	self.formatFecha = function(s) { if(s) return s.substring(0, 4); }

	var url = '/apiv1/datasets/' + $routeParams.id;
	Rest.add(url + '?nombreFuentes=true&nombreContribuidor=true&nombreEstadistica=true')
	.add(url + '/nacional')
	.add(url + '/estatal')
	.add(url + '/municipal')
	.load(function(err, res) {
		if(err)  {
			self.httpStatus = 1;
		} else {
			self.dataset = res[0];
			self.dataset.nacional = res[1];
			self.dataset.estatal = res[2];
			self.dataset.municipal = res[3];
			self.table = Dataset.toTable([self.dataset]);
			self.map = Dataset.toMap(self.dataset);
			self.display = 'tabla';
			self.httpStatus = 0;
		}
	});

}]);
