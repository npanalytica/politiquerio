/**
 * @name mexico-map-controller
 * @version 0.0.1
 *
**/

angular.module('app').controller('MexicoMapController', [
'$scope', '$timeout', 'Rest', 'Helpers', 'MexicoMapaDraw',
function($scope, $timeout, Rest, Helpers, Draw) {

	var self = this;


	var container_id = "#pol_mexico_map_container";

	self.initialized = false;
	$timeout(function () {
		self.initialized = true;
	}, 0.1);

	Rest.add('/static/geojson/estados.json')
	.add('/static/geojson/municipios.json')
	.load(function(err, res) {
		if(!err) {
			Draw.setGeoJson(res[0], res[1]);
			if(Draw.DATASETS && self.datasetId) {
				Draw.mexico(container_id, self.width);
			}
		}
	});

	$scope.$watch(function() {
		return self.datasetId;
	}, function(_datasetId) {
		if(_datasetId) {
			Rest.add('/apiv1/datasets/' + _datasetId + '/estatal?nombreEstados=true')
			.add('/apiv1/datasets/' + _datasetId + '/municipal?nombreMunicipios=true')
			.load(function(err, res) {
				if(!err) {
					Draw.setDatasets(res[0], res[1]);
					if(Draw.GEOJSON) Draw.mexico(container_id, self.width);
					self.initialized = true;
				}
			});
		}
	});

}]);
