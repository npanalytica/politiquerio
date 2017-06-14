/**
 * @name: chart_dataset_maker
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('DatasetHelpers', [
'Helpers', 'Static', 'Entidades', 'ChartHelpers',
function(Helpers, Static, Entidades, ChartHelpers) {

	function makeRows(_datasets, tipo) {
		var rows = [];
		var dict = tipo == 'estatal' ?
			Entidades.estados_dict : Entidades.municipios_dict;
		var prop = tipo == 'estatal' ? 'estatal_dict' : 'municipal_dict';
		for(id in dict) {
			var nombre = dict[id].nombre;
			if(tipo == 'municipal')
				nombre += ', ' + Entidades.estados_dict[dict[id].estado_id].nombre;
			var row = [id, nombre];
			for(var i = 0; i < _datasets.length; i++) {
				var entrada = _datasets[i][prop][id];
				var valor = entrada ? entrada.valor : null;
				row.push(valor);
			}
			rows.push(row)
		}
		return rows;
	}

	function makeDictionaries(_datasets) {
		for(var i = 0; i < _datasets.length; i++) {
			if(!_datasets[i].estatal_dict) {
				_datasets[i].estatal_dict
					= Helpers.dictionarify(_datasets[i].estatal,
						'estado_id');
				_datasets[i].municipal_dict
					= Helpers.dictionarify(_datasets[i].municipal,
						'municipio_id');
			}
		}
	}

	return {

		toTable: function(_datasets) {
			makeDictionaries(_datasets);
			var estatal = makeRows(_datasets, 'estatal');
			var municipal = makeRows(_datasets, 'municipal');
			var headers = _.pluck(_datasets, 'nombre');
			headers = ['id', 'entidad'].concat(headers);
			var data = _.groupBy(municipal, function(m) {
				return Math.floor(m[0] / 1000);
			});
			data.estados = estatal;
			data.municipios = municipal;
			return {
				headers: headers,
				data: data,
				has_mun_data: _.some(_datasets, function(d) {
					return d.n_municipales > 0;
				})
			}
		},

		toMap: function(_dataset) {
			var table_data = {};
			for(var i = 0; i < _dataset.estatal.length; i++) {
				var entrada = _dataset.estatal[i];
				table_data[entrada.estado_id] = entrada.valor;
			}
			for(var i = 0; i < _dataset.municipal.length; i++) {
				var entrada = _dataset.municipal[i];
				table_data[entrada.municipio_id] = entrada.valor;
			}
			return table_data;
		},

		toLineChart: function(_datasets) {
			var datasets = _.sortBy(_datasets, 'fecha');
			makeDictionaries(datasets);
			var labels = [];
			var datasets = [];

			var data = [];
			for(var j = 0; j < _datasets.length; j++) {
				labels.push(_datasets[j].fecha.substring(0,4));
				var entrada = _datasets[j].nacional[0];
				var valor = entrada ? entrada.valor : null;
				data.push(valor);
			}
			datasets.push(ChartHelpers.makeDataset('nacional', data));
			return {
				labels: labels,
				datasets: datasets
			}
		}
	}
}]);
