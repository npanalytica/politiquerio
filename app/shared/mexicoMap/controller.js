/**
 * @name mexico-map-controller
 * @version 0.0.1
 *
**/

angular.module('app').controller('MexicoMapController', [
'$scope', 'Rest', 'Helpers', 'MexicoMapaDraw',
function($scope, Rest, Helpers, Draw) {

	var self = this;

	self.status = 2;

	Draw.setCallback(function() { self.status = 0; });


	var container_id = "#pol_mexico_map_container";


	Rest.add('/static/geojson/estados.json')
	.add('/static/geojson/municipios.json')
	.load(function(err, res) {
		if(!err) {
			Draw.setGeoJson(res[0], res[1]);
			if(Draw.DATASET) Draw.mexico(container_id, self.width);
		}
	});

	$scope.$watch(function() {
		return self.dataset;
	}, function(_dataset) {
		if(_dataset) {
			Draw.setDataset(_dataset);
			if(Draw.GEOJSON) Draw.mexico(container_id, self.width);
		}
	});

}]);
