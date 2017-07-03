/**
 * @name: Rest.js
 * @desc: Handles all api requests.
**/

angular.module('app').service('Rest', [
'$q', '$http', 'config',
function($q, $http, config) {

	function makePromises(requests) {
		var promises = [];
		for(var i = 0; i < requests.length; i++) {
			var promise = null;
			promise = $http[requests[i].method]
				(config.host + requests[i].path, requests[i].params);
			promises.push(promise);
		}
		return promises;
	}

	return {
		requests: [],
		add: function(path, method, params) {
			method = method || 'get';
			params = params || null;
			var request = {
				path: path,
				method: method,
				params: params
			}
			this.requests.push(request);
			return this;
		},
		load: function(callback) {
			var self = this;
			var promises = makePromises(this.requests);
			self.requests = [];
			$q.all(promises).then(function(result) {
				callback(null, _.pluck(result, 'data'));
			}, function(error) {
				callback(error.status, null);
			});
		}

	}
}]);

/**
 * @name: Respuestas.js
 * @desc: Regresa una simple cadena de texto que (ojalá) responde la pregunta
 * del usuario
**/

angular.module('app').service('Responder', [
'Entidades', 'Helpers',
function(Entidades, Helpers) {

	var N_PLURAL = 3; 	// El número de estados/municipios que responden a una
						// pregunta en plural

	function datosEntidades(dataset, entidades, tipo) {
		var ids = _.pluck(entidades, 'id');
		var id = tipo == 'estatal' ? 'estado_id' : 'municipio_id';
		var nombre = tipo == 'estatal' ? 'estado' : 'municipio';
		var resultados = _.filter(dataset[tipo], function(ds) {
			return _.contains(ids, ds[id]);
		});
		resultados = Helpers.sort(resultados, 'mayor');
		var res = '<table class="respuesta-tabla">';
		for(var i = 0; i < resultados.length; i++) {
			res += "<tr><td class='respuesta-celda'>"
			+ "<span class='font-primary'>" + (i + 1) + ".&nbsp;</span>"
			+ "<span class='font-secondary'>"
			+ resultados[i][nombre];
			if(tipo == 'municipal') {
				var e_id = Math.floor(resultados[i].municipio_id / 1000);
				res += ', ' + Entidades.estados_dict[e_id].nombre;
			}
			res += "</span></td><td class='respuesta-celda'>"
			+ resultados[i].valor.toLocaleString() + "</td></tr>";
		}
		return res + '</table>';
	}

	function jerarquiaEntidades(_arr, ideas, tipo) {
		if(_arr.length == 0) return '';
		if(	ideas.subordinado != 'conceptos' &&
			ideas.subordinado != (tipo + 's') &&
			ideas.sujeto != 'lugares') return '';
		var respuesta = '';
		var last_index = ideas.cardinalidad == 'lista' ? N_PLURAL : 1;
		if(ideas.sujeto == 'lugares') {
			respuesta = '<span class="font-secondary">'
			+ tipo.charAt(0).toUpperCase()
			+ tipo.slice(1) + 's: </span>';
		}
		var pedazos = [];
		var arr = Helpers.sort(_arr, ideas.subconcepto);
		for(var i = 0; i < last_index; i++) {
			var pedazo = arr[i][tipo];
			if(tipo == 'municipio') {
				var e_id = Math.floor(arr[i].municipio_id / 1000);
				pedazo += ', ' + Entidades.estados_dict[e_id].nombre;
			}
			pedazo += ' '
			+ ' <span class="font-afterthought">('
			+ arr[i].valor.toLocaleString()
			+ ')</span>';
			pedazos.push(pedazo);
		}
		return respuesta + Helpers.juntarLista(pedazos);
	}

	return {
		datos: function(dataset, ideas, estados, municipios) {
			switch(ideas.subordinado) {
				case 'pais':
					return "<span class='font-secondary'>"
					+ "México</span>&nbsp;<i class='ion-arrow-right-c'></i>"
					+ "&nbsp;" + dataset.nacional[0].valor.toLocaleString();
					break;
				case 'estados':
					return datosEntidades(dataset, estados, 'estatal');
					break;
				case 'municipios':
					return datosEntidades(dataset, municipios, 'municipal');
					break;
			}
		},
		jerarquia: function(dataset, ideas) {
			var e = jerarquiaEntidades(dataset.estatal, ideas, 'estado');
			var m = jerarquiaEntidades(dataset.municipal, ideas, 'municipio');
			return ideas.sujeto == 'lugares' ? e + '<br/>' + m : e + m;
		}
	}

}]);

/**
 * @name: RestDataset.js
 * @desc: Handles all api requests.
**/

angular.module('app').service('RESTDataset', [
'Rest', 'Helpers', '$timeout',
function(Rest, Helpers, $timeout) {
	return {
		requests: [],
		loadData: function(ds) {
			Rest.add('/apiv1/datasets/' + ds.id + '/nacional/')
			.add('/apiv1/datasets/' + ds.id + '/estatal/')
			.add('/apiv1/datasets/' + ds.id + '/municipal/')
			.load(function(err, res) {
				if(!err) {
					ds.nacional = res[0];
					ds.estatal = res[1];
					ds.estatal_dict = Helpers.dictionarify(res[1], 'estado_id');
					ds.municipal = res[2];
					ds.municipal_dict = Helpers.dictionarify(res[2], 'municipio_id');
				}
			})
		},
		search: function(obj, pagination) {
			obj.httpStatus = 2;
			Rest.add('/apiv1/datasets/search', 'post', obj)
			.load(function(err, res) {
				if(err) {
					obj.httpStatus = 1;
				} else {
					obj.httpStatus = 0;
					obj.resultados = res[0];
					if(pagination) pagination.update(res[0].length);
				}
			});
		}
	}
}]);

/**
 * @name: Rest.js
 * @desc: Handles all api requests.
**/

angular.module('app').service('Search', [
'Rest', 'ChartHelpers',
function(Rest, ChartHelpers) {
	return {
		search: function(needle, callback) {
			Rest.add('/apiv1/search/' + needle).load(function(err, res) {
				callback(err, res);
			});
		}
	}

}]);

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
			var has_mun_data = municipal.length > 0 ||
				_.some(_datasets, function(d) { return d.n_municipales > 0; });
			return {
				headers: headers,
				data: data,
				has_mun_data: has_mun_data
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

angular.module('app').service('Static', [function(){
	return {
		colors: [
			'#d1495b', //Secondary color
			'#4679B2', //Primary color
			'#7bab38', //Light green
			'#5290a3', //Light blue
			'#6d406b', //Purple
			'#29406b', //Dark blue
			'#2c7348', //Green
			'#849a5a', //Soap green
			'#b09048', //Orange
			'#20426b', //Dark blue
			'#e49b33', //Light orange
			'#745574', //Mint purple
			'#653c65', //Dark mint purple
			'#a4d4ff', //Super light blue
			'#283845', //Gray blue
			'#333333', //Gray
		],
		light_colors: [
			'#eb6375', //Secondary color
			'#6093cc', //Primary color
			'#95c552', //Light green
			'#6caabd', //Light blue
			'#875a85', //Purple
			'#435a85', //Dark blue
			'#2c7348', //Green
			'#468d62', //Soap green
			'#caaa62', //Orange
			'#3a5c85', //Dark blue
			'#feb54d', //Light orange
			'#8e6f8e', //Mint purple
			'#7F567f', //Dark mint purple
			'#Beeeff', //Super light blue
			'#42525f', // Gray blue
			'#4d4d4d', //Gray
		],
		niveles_seguridad: [
			{texto: 'Sin clasificación', 	color: '#42525f'},
			{texto: 'Baja', 				color: '#c97b84'},
			{texto: 'Mediana', 				color: '#b09048'},
			{texto: 'Alta', 				color: '#2c7348'},
			{texto: 'Oficiales', 			color: '#4679B2'},
		],
		meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
			'Agosto', 'Septiemre', 'Octubre', 'Noviembre', 'Diciembre'],
		letras: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
				 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
			 	 'y', 'z']
	}
}]);

/**
 * @name: chart_dataset_maker
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('ChartHelpers', [
'Static',
function(Static) {
	return {
		makeDataset: function(label, data, color) {
			if(!color) {
				color = Static.colors[0];
			} else if (!isNaN(color)) {
				color = Static.colors[color % Static.colors.length];
			}
			return {
				label: label,
				data: data,
				fill: false,
				borderColor: color,
				pointBorderColor: color,
				backgroundColor: color,
				hoverBackgroundColor: color,
				borderWidth: 2
			}
		},

		zoomDatasets: function(index, ds, sort) {
			var self = this;
			var zoom = [];
			for(var i = 0; i < ds.length; i++) {
				zoom.push(self.makeDataset(ds[i].label, [ds[i].data[index]], i));
			}
			if(sort) {
				zoom = _.sortBy(zoom, function(z) { return -z.data[0] });
			}
			return zoom;
		}
	}
}]);

/**
 * @name: helpers
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('Helpers', [
function(Helpers) {

	return {
		// turns an array into a dictionary, with key @prop -> default: id
		dictionarify: function(arr, prop) {
			if(!_.isArray(arr)) return null;
			prop = prop || 'id';
			dict = {};
			for(var i = 0; i < arr.length; i++) {
				dict[arr[i][prop]] = arr[i];
			}
			return dict;
		},
		juntarLista: function(arr) {
			if(arr.length == 1) return arr[0];
			arr[arr.length - 2] =
				arr[arr.length - 2] + ' y ' + arr[arr.length - 1];
			arr.pop();
			return arr.join(', ');
		},
		// returns a random item from an array
		randomItem: function(array) {
			var index = Math.floor(Math.random() * array.length);
			return array[index];
		},
		removeItem: function(item, array) {
			var index = array.indexOf(item);
			if(index > -1) array.splice(array.indexOf(item), 1);
		},
		sort: function(datos, tipo, prop) {
			prop = prop || 'valor';
			return _.sortBy(datos, function(d) {
				return tipo == 'mayor' ?
					-parseInt(d[prop]) : parseInt(d[prop]);
			});
		},
		generatePagination: function(n_items, items_per_page, max_pages) {
			max_pages = max_pages || Infinity;
			var n_pages = Math.ceil(n_items / items_per_page);
			var pages = [];
			var pagination = {
				"truncated": false,
				"max_pages": max_pages,
				"items_per_page": items_per_page,
				"pages": pages,
				"current_page": 0,
				nextPage: function() {
					if(this.current_page < (this.pages[this.pages.length - 1]))
						this.current_page++;
				},
				prevPage: function() {
					if(this.current_page > 0) this.current_page--;
				},
				update: function(n_items) {
					var n_pages = Math.ceil(n_items / items_per_page);
					var pages = [];
					if(n_pages < this.max_pages) {
						for(var i = 0; i < n_pages; i++) pages.push(i);
					} else {
						this.truncated = true;
						pages = [0,1,2];
						for(var i = 3; i >= 1; i--) pages.push(n_pages - i);
					}
					this.pages = pages;
					this.current_page = 0;
				}
			}
			return pagination;
		}
	}
}]);

/**
 * @name: chart_dataset_maker
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('Entidades', [
'Rest', 'Helpers',
function(Rest, Helpers) {

	var entidades = {
		estados: null,
		municipios: null,
		estados_dict: null,
		municipios_dict: null
	}

	if(!entidades.estados) {
		Rest.add('/apiv1/estados').add('/apiv1/municipios')
		.load(function(err, res) {
			entidades.estados = res[0];
			entidades.municipios = res[1];
			entidades.estados_dict = Helpers.dictionarify(res[0]);
			entidades.municipios_dict = Helpers.dictionarify(res[1]);
		})
	}
	
	return entidades;

}]);
