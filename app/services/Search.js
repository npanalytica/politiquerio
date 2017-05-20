/**
 * @name: Rest.js
 * @desc: Handles all api requests.
**/

angular.module('app').service('Search', [
'Rest', 'ChartHelpers',
function(Rest, ChartHelpers) {

	function assembleSearch(result, geo, type) {

		var con_estados = _.filter(result, function(ds) {
			return ds.n_estatales > 0;
		});

		var ds_con_estados = _.map(con_estados, function(ds) {
			return {id: ds.id, fecha: ds.fecha, fuente: ds.fuente}
		});


		var prop = type == 'estatal' ? 'estado_id' : 'municipio_id';

		var meta = {
			estadistica: result[0].estadistica,
			estadistica_id: result[0].estadistica_id,
			fuente: result[0].fuente,
			fuente_id: result[0].fuente_id,
			fuente_descripcion: result[0].fuente_descripcion,
			datasets_con_estados: ds_con_estados,
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
			datasets.push(ChartHelpers.makeDataset(labels[i], datos[i], i));
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
