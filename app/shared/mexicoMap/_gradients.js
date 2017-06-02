/**
 * @name: mexico-mapa-draw
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('MexicoMapaGradients', [
'MexicoMapaColors',
function(Colors) {
	return {
		draw: function(svg, type, dataset, _g) {
			svg.selectAll('.' + type).attr('fill', function(d) {
				var id = d.properties.state_code;
				if(type == 'municipio') id = id * 1000 + d.properties.mun_code;
				var g = type == 'estado' ? _g.estatal : _g.municipal;
				var valor = dataset[id];
				if(!valor) return '#' + Colors.empty;
				var g = (valor - g.min) / (g.max - g.min);
				return '#' + Colors.gradient(g, Colors.max, Colors.min);
			});
		}
	}
}]);
