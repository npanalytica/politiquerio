/**
 * @name: Rest.js
 * @desc: Handles all api requests.
**/

angular.module('app').service('Search', [
'Rest', 'Static',
function(Rest, Static) {

	function assembleSearch(result, geo, type) {

		var prop = type == 'estatal' ? 'estado_id' : 'municipio_id';

		var meta = {
			estadistica: result[0].estadistica,
			estadistica_id: result[0].estadistica_id,
			fuente: result[0].fuente,
			fuente_id: result[0].fuente_id,
			fuente_descripcion: result[0].fuente_descripcion,
			labels: [],
			datasets: []
		}

		meta.labels = _.map(_.pluck(result, 'fecha'), function(f) {
			return f.substring(0, 4);
		});

		var datasets = [];
		var labels = type == 'nacional' ? ['México'] : _.pluck(geo, 'nombre');
		var indices = type == 'nacional' ? [0] : _.pluck(geo, 'id');
		var datos = [];

		for(var i = 0; i < indices.length; i++) datos.push([]);
		var _datos = _.pluck(result, 'datos'); // Los datos de cada dataset
		for(var i = 0; i < _datos.length; i++) {
			for(var j = 0; j < _datos[i].length; j++) {
				var entrada = _datos[i][j];
				var indice = type == 'nacional' ? 0 : _.indexOf(indices, entrada[prop]);
				datos[indice].push(entrada.valor);
			}
		}

		for(var i = 0; i < indices.length; i++) {
			var color = Static.colors[i % Static.colors.length];
			var light = Static.light_colors[i % Static.colors.length];
			datasets.push({
				label: labels[i],
				data: datos[i],
				fill: false,
				borderColor: color,
				pointBorderColor: color,
				backgroundColor: color,
				pointBackgroundColor: light,
				borderWidth: 2
			});
		}

		meta.datasets = datasets;

		return meta;

	}

	return {
		search: function(needle, callback) {
			Rest.add('/apiv1/search/' + needle).load(function(err, res) {
				var results = res[0].data;
				var type = res[0].type;
				var geo = res[0].geo;
				var shits = [];
				for(var i = 0; i < results.length; i++) {
					shits.push(assembleSearch(results[i], geo, type));
				}
				callback(err, shits);
			});
		}
	}

}]);
