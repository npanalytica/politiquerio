/**
 * @name: mexico-mapa-colors
**/

angular.module('app').service('MexicoMapaZooms', [
function() {

	function hex(x) {
		x = x.toString(16);
		return (x.length == 1) ? '0' + x : x;
	};

	return {
		getProportion: function(d, path, dim) {
			var K_FIX = -1; // <- Esto se necesita por razones
			var bounds = path.bounds(d);
			var w_dif = dim.width / ((bounds[1][0] - bounds[0][0]));
			var h_dif = dim.height / ((bounds[1][1] - bounds[0][1]));
			var k = w_dif < h_dif ? w_dif : h_dif;
			if(k > 15) {
				return 20;
			} else {
				return k + K_FIX;
			}
		},
		zoomOut: function() {

		}
	}
}]);
