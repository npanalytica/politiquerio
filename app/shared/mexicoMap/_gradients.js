/**
 * @name: mexico-mapa-draw
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('MexicoMapaGradients', [
'MexicoMapaColors',
function(Colors) {
	return {
		draw: function(svg, type, datasets) {
			svg.selectAll('.' + type).attr('fill', function(d) {
				var id = d.properties.state_code;
				if(type == 'municipio') id = id * 1000 + d.properties.mun_code;
				var dataset = type == 'estado' ?
					datasets.estatal : datasets.municipal;
				var dato = dataset.datos[id];
				if(!dato) return '#' + Colors.empty;
				var g = (dato.valor - dataset.min) / (dataset.max - dataset.min);
				return '#' + Colors.gradient(g, Colors.max, Colors.min);
			});
		}
	}
}]);
