/**
 * @name: mexico-mapa-colors
**/

angular.module('app').service('MexicoMapaColors', [
function() {

	function hex(x) {
		x = x.toString(16);
		return (x.length == 1) ? '0' + x : x;
	};

	return {
		empty : '383c44', // Color para cuando no hay datos
		max	  : '4679b2', // Color para el valor máximo
		min	  : 'e1e1e1', // Color para el valor mínimo
		gradient: function(ratio, color1, color2) {
			var r = Math.ceil(parseInt(color1.substring(0,2), 16) * ratio +
				parseInt(color2.substring(0,2), 16) * (1-ratio));
			var g = Math.ceil(parseInt(color1.substring(2,4), 16) * ratio +
				parseInt(color2.substring(2,4), 16) * (1-ratio));
			var b = Math.ceil(parseInt(color1.substring(4,6), 16) * ratio +
				parseInt(color2.substring(4,6), 16) * (1-ratio));
			return hex(r) + hex(g) + hex(b);
		}
	}
}]);
