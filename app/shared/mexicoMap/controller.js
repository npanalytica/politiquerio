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
			if(Draw.DATASETS && self.DATASET) {
				Draw.mexico(container_id, self.width);
				self.initialized = true;
			}
		}
	});

	$scope.$watch(function() {
		return self.dataset;
	}, function(_dataset) {
		if(_dataset) {
			Draw.setDataset(_dataset);
			if(Draw.GEOJSON) Draw.mexico(container_id, self.width);
			self.initialized = true;
		}
	});

}]);
