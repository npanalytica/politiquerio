/**
 * @name: mexico-mapa-draw
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('MexicoMapaDraw', [
'Helpers', 'MexicoMapaActions', 'MexicoMapaGradients',
function(Helpers, Actions, Gradients) {

	var _tooltip = d3.select("body").append("div")
	.attr("class", "tooltip").style("opacity", 0);

	return {
		MAP_ID: 'pol_mexico_map',
		DATASETS: null,
		GEOJSON: null,
		SVG: null,
		PATH: null,
		SCALE: 0,
		DIMENSIONS: {height: 0, width: 0},
		BOUNDS: {
			top_latitude	: 32.71865357526209,
			bottom_latitude	: 14.532098361948302,
			left_longitude	: -118.40764955087901,
			right_longitude	: -86.71040527005668
		},
		TOOLTIP: _tooltip,
		setDataset: function(ds) {
			this.DATASET = ds;
			var eds = _.pick(ds, function(v,k) { return k < 1000; });
			var mns = _.pick(ds, function(v,k) { return k > 1000; });
			this.G = {
				estatal: {min: _.min(eds), max: _.max(eds)},
				municipal: {min: _.min(mns), max: _.max(mns)}
			}
		},
		setGeoJson: function(estados, municipios) {
			this.GEOJSON = {estados: estados, municipios: municipios};
		},
		mexico: function(container_id, width) {
			var self = this;
			self.DIMENSIONS.width = width;
			// 0.62 -> La razón entre la altura y el ancho de Mexico:
			self.DIMENSIONS.height = width * 0.62;
			// Si ya se dibujo, destruye. Útil en resize
			d3.select('#' + self.MAP_ID).remove();
			// Haz que la escala sea la diferencia entra las longitudes del país
			self.SCALE = 360 * self.DIMENSIONS.width /
				(-self.BOUNDS.right_longitude - self.BOUNDS.left_longitude);
			// Dibuja
			self.SVG = d3.select(container_id)
				.append("svg")
				.attr("id", self.MAP_ID)
				.attr("width", self.DIMENSIONS.width)
				.attr("height", self.DIMENSIONS.height)
				.attr("class", "mapa");
			// translada el origen a 0,0
			var projection = d3.geoMercator().scale(self.SCALE).translate([0,0]);
			// checa donde se proyecta la coordenada izquierda
			var trans = projection([self.BOUNDS.left_longitude,
				self.BOUNDS.top_latitude]);
			// translada el mapa en en la dirección NEGATIVA del resultado
			projection.translate([-1*trans[0],-1*trans[1]]);
			self.PATH = d3.geoPath().projection(projection);
			self.estados();
		},
		estados: function() {
			var self = this;
			self.SVG.selectAll('.estado')
			.data(topojson.feature(self.GEOJSON.estados,
				self.GEOJSON.estados.objects.states).features)
			.enter()
			.append("path")
			.attr("class", function(d) { return 'estado'; })
			.on("mousemove", function(d) { Actions.mouseMove(self.TOOLTIP); })
			.on("mouseover", function(d) {
				Actions.mouseOver(d, 'estado', self.TOOLTIP, self.DATASET);
			})
			.on("mouseout", function(d) { Actions.mouseOut(self.TOOLTIP); })
			.on("click", function(d) {
				Actions.estadoClick(d, self.SVG, self.PATH, self.DIMENSIONS);
				self.municipios(d.properties.state_code);
			})
			.attr("d", self.PATH);
			// Draw borders
			self.SVG.append("path")
			.datum(topojson.mesh(self.GEOJSON.estados,
				self.GEOJSON.estados.objects.states))
			.attr("d", self.PATH).attr("class", 'estado-border');
			Gradients.draw(self.SVG, 'estado', self.DATASET, self.G);
		},
		municipios: function(estado_id) {
			var self = this;
			var mun_data = {
				type: "GeometryCollection",
				bbox: [0,0,0,0],
				geometries: self.GEOJSON.municipios[estado_id]
			}
			// If already drawn, destroy
			d3.selectAll(".municipio").remove();
			d3.selectAll(".municipio-border").remove();
			self.SVG.selectAll('.municipio')
			.data(topojson.feature(self.GEOJSON.estados, mun_data).features)
			.enter()
			.append("path")
			.on("mousemove", function(d) { Actions.mouseMove(self.TOOLTIP); })
			.on("mouseover", function(d) {
				Actions.mouseOver(d, 'municipio', self.TOOLTIP, self.DATASET);
			})
			.on("mouseout", function(d) { Actions.mouseOut(self.TOOLTIP); })
			.on("click", function(d) {
				Actions.municipioClick(d, self.SVG, self.DIMENSIONS, self.TOOLTIP);
			})
			.attr("class", function(d) { return 'municipio'; })
			.attr("d", self.PATH);
			// Draw borders
			self.SVG.append("path")
			.datum(topojson.mesh(self.GEOJSON.estados, mun_data))
			.attr("d", self.PATH).attr("class", 'municipio-border');
			Gradients.draw(self.SVG, 'municipio', self.DATASET, self.G);
		}
	}
}]);
