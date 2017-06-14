/**
 * @name: mexico-mapa-draw
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('MexicoMapaActions', [
'MexicoMapaZooms',
function(Zoom) {
	const PADDING = 10;
	return {
		mouseMove: function(tooltip) {
			tooltip.style("left", (d3.event.pageX) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		},
		mouseOver: function(d, tipo, tooltip, dataset) {
			var texto = "Sin datos";
			var nombre = tipo == 'estado' ?
				d.properties.state_name : d.properties.mun_name;
			var id = d.properties.state_code;
			if(tipo == 'municipio') id = id * 1000 + d.properties.mun_code;
			if(dataset[id]) texto = dataset[id].toLocaleString();
			tooltip.style("opacity", 0.9);
			tooltip.html(nombre + ': ' + texto)
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
		},
		mouseOut: function(tooltip) {
			tooltip.style("opacity", 0);
		},
		estadoClick: function(d, svg, path, dim) {
			var centroid = path.centroid(d);
			var k = Zoom.getProportion(d, path, dim);
			var coords = [centroid[0] + PADDING, centroid[1] + PADDING, k];
			svg.selectAll('.estado').classed('estado-unfocused', function(d_2) {
				if(d != d_2) return true;
			})
			svg.transition().duration(500).attr('transform',
				'translate(' + dim.width / 2 + ',' + dim.height / 2 + ')\
				scale(' + coords[2] + ') translate (' + -coords[0] + ','
				+ -coords[1] + ')');
		},
		municipioClick: function(d, svg, dim, tooltip) {
			svg.selectAll('.estado').classed('estado-unfocused', false);
			svg.selectAll('.municipio-border').remove();
			svg.selectAll('.municipio').remove();
			var coords = [dim.width / 2, dim.height / 2, 1];
			svg.transition().duration(500).attr('transform',
				'translate(' + dim.width / 2 + ',' + dim.height / 2 + ')\
				scale(' + coords[2] + ') translate (' + -coords[0] + ',' + -coords[1] + ')');
			this.mouseOut(tooltip);
		}
	}
}]);
