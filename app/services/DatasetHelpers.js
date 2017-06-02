/**
 * @name: chart_dataset_maker
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('DatasetHelpers', [
'Static',
function(Static) {

	/** @desc: Regresa el valor numérico obtenido de aplicar el árbol binario
		@param {obj} node (obtenido de math.parse() -> math.js) a los valores de
		@param {arr} row (la fila de una tabla). */

	function traverseNode(node, row) {
		var values = [];
		for(var i = 0; i < 2; i++) {
			var arg = node.args[i];
			if(arg.valueType == 'number') {
				values.push(node.args[i]);
			} else if (arg.hasOwnProperty('name')) {
				values.push(row[Static.letras.indexOf(arg.name) + 1]);
			} else if(arg.hasOwnProperty('content')) {
				values.push(traverseNode(arg.content, row));
			}
		}
		switch(node.fn) {
			case 'add': return values[0] + values[1]; break;
			case 'subtract': return values[0] - values[1]; break;
			case 'multiply': return values[0] * values[1]; break;
			case 'divide': return values[0] / values[1]; break;
			case 'pow': return Math.pow(values[0], values[1]); break;
		}
	}

	function makeRows(datasets, geo, tipo) {
		var rows = [];
		for(id in geo) {
			var row = [id, geo[id].nombre];
			for(var i = 0; i < datasets.length; i++) {
				var ds = datasets[i][tipo + '_dict'];
				if(ds) {
					var entrada = ds[id];
					var valor = entrada ? entrada.valor : null;
					row.push(valor);
				}
			}
			rows.push(row)
		}
		return rows;
	}

	return {

		makeDataset: function(_datos) {
			var data = _.sortBy(_datos, function(d) {
				return parseInt(d.fecha.substring(0,4));
			})
			var labels = _.map(_.pluck(_datos, 'fecha'), function(f) { return f.substring(0,4) });
			var data = _.pluck(data, 'valor');
			return {labels: labels, data: data};
		},

		makeTable: function(_datasets, estados, municipios) {
			var estatal = makeRows(_datasets, estados, 'estatal');
			var municipal = makeRows(_datasets, municipios, 'municipal');
			var headers = _.pluck(_datasets, 'nombre');
			headers = ['id', 'entidad'].concat(headers);
			var data = _.groupBy(municipal, function(m) {
				return Math.floor(m[0] / 1000);
			});
			data[0] = estatal;
			return {
				headers: headers,
				data: data,
				has_mun_data: _.some(_datasets, function(d) {
					return d.n_municipales > 0;
				})
			}
		},

		makeRArrays: function(rows, a, b) {
			var data = [];
			for(var i = 0; i < rows.length; i++) {
				data.push({
					label: rows[i][0],
					r: 4,
					x: rows[i][a],
					y: rows[i][b]
				})
			}
			return data;
		},

		extractColumn: function(_rows, index) {
			var col = [];
			for(var i = 0; i < _rows.length; i++) {
				col.push(_rows[i][index]);
			}
			return col;
		},

		toMap: function(table, index) {
			var self = this;
			var table_data = {};
			for(i in table.data) {
				for(var j = 0; j < table.data[i].length; j++) {
					var id = table.data[i][j][0];
					var value = table.data[i][j][index];
					table_data[id] = value;
				}
			}
			return table_data;
		},

		toMap2: function(ds_estatal, ds_municipal) {
			var ds = {};
			for(var i = 0; i < ds_estatal.length; i++) {
				ds[ds_estatal[i].estado_id] = ds_estatal[i].valor;
			}
			for(var i = 0; i < ds_municipal.length; i++) {
				ds[ds_municipal[i].municipio_id] = ds_municipal[i].valor;
			}
			return ds;
		},

		/** @param {obj} _custom -> obtenido de @generateCustomColMeta(), en
		 	_dataset_custom_column */
		appendCustomColumn: function(table, _custom) {
			for(var i = 0; i < table.rows.length; i++) {
				var new_val = traverseNode(_custom.node, table.rows[i]);
				table.rows[i].push(new_val);
			}
			table.headers.push(_custom.name);
		}

	}
}]);
