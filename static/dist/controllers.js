/**
 * @name LandingController
 * @version 0.0.1
 */

angular.module('app').controller('LandingController', [
'$routeParams', 'Rest',
function($routeParams, Rest) {
	var self = this;
	self.preQuery = $routeParams.prequery;
	self.cuentas = {estadisticas: '???', datasets: '???', datos: '???'};


	Rest.add('/apiv1/meta/cuentas/').load(function(err, res) {
		if(!err) {
			self.cuentas = res[0];
		}
	});

}]);

/**
 * @name BuscarController
 * @version 0.0.1
 */

angular.module('app').controller('BuscarController', [
'RESTDataset', 'Helpers', 'Static',
function(RESTDataset, Helpers, Static) {

	var self = this;

	self.SLIDER_DATE_OPTIONS = {floor: 1900, ceil: 2017};
	self.SLIDER_CLEAN_OPTIONS = {floor: 0, ceil: 4};

	self.search = {
		text: '',
		httpStatus: 3,
		has_national_data: false,
		has_state_data: false,
		has_mun_data: false,
		years: {from: 1900, to: 2017},
	}

	self.formatFecha = function(s) {
		return s.substring(0, 4);
	}

	self.pagination = Helpers.generatePagination(0, 7, 15);

	self.buscar = function() {
		RESTDataset.search(self.search, self.pagination);
	}

	/*
	self.datasets = []; // <- Elegidos por el usuario
	self.results = []; // <- Results
	self.display = 'lists';
	self.pagination = Helpers.generatePagination(0, 10);

	var grupos = [];

	self.removeItem = Helpers.removeItem;

	self.back = function(to) {
		var pu = [];
		switch(to) {
			case 'grupos':
				self.selected_grupo = null;
				self.pagination.update(self.grupos.length);
				break;
			case 'subgrupos':
				self.selected_subgrupo = null;
				self.pagination.update(self.selected_grupo.subgrupos.length);
				break;
			case 'estadisticas':
				self.selected_estadistica = null;
				self.pagination.update(self.selected_subgrupo.estadisticas.length);
				break;
			case 'estadisticas':
				self.selected_estadistica = null;
				self.pagination.update(self.selected_subgrupo.estadisticas.length);
				break;
			case 'datasets':
				self.selected_dataset = null;
				self.pagination.update(self.selected_estadistica.datasets.length);
				break;
		}
	}


	Rest.add('/apiv1/grupos/').add('/apiv1/estados').add('/apiv1/municipios')
	.load(function(err, res) {
		if(!err) {
			self.grupos = res[0];
			self.pagination.update(res[0].length);
			self.estados = Helpers.dictionarify(res[1]);
			self.municipios = Helpers.dictionarify(res[2]);
		}
	});

	self.setGrupo = function(grupo) {
		self.selected_grupo = grupo;
		if(!grupo.subgrupos) {
			var url = '/apiv1/grupos/' + grupo.id + '/subgrupos';
			loadChildren(url, grupo, 'subgrupos');
		}
	}

	self.set = function(obj, nombre, child_prop) {
		var selected_name = 'selected_' + nombre;
		self.filter = '';
		self.display = 'lists';
		self[selected_name] = obj;
		if(!obj[child_prop]) {
			var url = '/apiv1/' + nombre + 's/' + obj.id + '/' + child_prop;
			loadChildren(url, obj, child_prop);
		} else {
			self.pagination.update(obj[child_prop].length);
		}
	}

	self.setDataset = function(ds) {
		self.selected_dataset = ds;
		if(!ds.nacional) RESTDataset.loadData(ds);
	}

	self.toggleDataset = function($e, ds) {
		$e.stopPropagation();
		if(ds.$$selected) {
			Helpers.removeItem(ds, self.datasets);
		} else {
			if(!ds.nacional) RESTDataset.loadData(ds);
			self.datasets.push(ds);
		}
		ds.$$selected = !ds.$$selected;
	}

	function loadChildren(url, obj, child_prop) {
		url += '?numeros=true&nombreFuentes=true';
		Rest.add(url).load(function(err, res) {
			if(!err) {
				if(res[0][0].hasOwnProperty('keywords')) {
					for(var i = 0; i < res[0].length; i++) {
						res[0][i].keywords = res[0][i].keywords.split(', ');
					}
				} else if(res[0][0].hasOwnProperty('fecha')) {
					for(var i = 0; i < res[0].length; i++) {
						// TODO: Encontrar una buena manera para formatear
						var d = new Date(res[0][i].fecha);
						res[0][i].$$fecha = d.getDate() + ' de ' +
							Static.meses[d.getMonth()] + ' de ' + d.getFullYear();
					}
				}
				obj[child_prop] = res[0];
				self.pagination.update(res[0].length);
			}
		});
	}

	self.filterKeypress = function($e) {
		if($e.keyCode !== 13) return;
		self.display = 'results';
		Rest.add('/apiv1/estadisticas/search/' + self.filter)
		.load(function(err, res) {
			self.filter = '';
			self.results = res[0];
		})
	}*/

}]);

/**
 * @name BuscarController
 * @version 0.0.1
 */

angular.module('app').controller('GruposController', [
'Rest', 'Helpers', '$routeParams',
function(Rest, Helpers, $routeParams) {

	var self = this;
	self.httpStatus = 2;
	self.pagination = Helpers.generatePagination(0, 10, 20);

	var url = '/apiv1/grupos';
	if($routeParams.id) {
		url += '/' + $routeParams.id + '?subgrupos=true&numeros=true';
	} else {
		url += '?numeros=true'
	}
	Rest.add(url).load(function(err, res) {
		if(err)  {
			self.httpStatus = 1;
		} else {
			self.httpStatus = 0;
			if($routeParams.id) {
				self.grupo = res[0][0];
				console.log(self.grupo);
				self.pagination.update(self.grupo.subgrupos.length);
			} else {
				self.pagination.update(res[0].length);
				self.grupos = res[0];
			}
		}
	});

}]);

/**
 * @name BuscarController
 * @version 0.0.1
 */

angular.module('app').controller('SubgruposController', [
'Rest', 'Helpers', '$routeParams',
function(Rest, Helpers, $routeParams) {

	var self = this;
	self.httpStatus = 2;
	self.pagination = Helpers.generatePagination(0, 10, 20);

	var url = '/apiv1/subgrupos/' + $routeParams.id + '?estadisticas=true&numeros=true';

	Rest.add(url).load(function(err, res) {
		if(err)  {
			self.httpStatus = 1;
		} else {
			self.httpStatus = 0;
			self.subgrupo = res[0][0];
			self.pagination.update(res[0][0].estadisticas.length);
		}
	});

}]);

/**
 * @name EstadisticasController
 * @version 0.0.1
 */

angular.module('app').controller('EstadisticasController', [
'Rest', 'Helpers', '$routeParams',
function(Rest, Helpers, $routeParams) {

	var self = this;
	self.httpStatus = 2;
	self.pagination = Helpers.generatePagination(0, 10, 20);

	self.formatFecha = function(s) { return s.substring(0, 4); }

	var url = '/apiv1/estadisticas/' + $routeParams.id;
	Rest.add(url).add(url + '/datasets?nombreFuentes=true&nombreContribuidor=true&numeros=true')
	.load(function(err, res) {
		if(err)  {
			self.httpStatus = 1;
		} else {
			self.httpStatus = 0;
			self.estadistica = res[0][0];
			self.estadistica.datasets = res[1];
			self.pagination.update(res[1].length);
		}
	});

}]);

/**
 * @name DatasetsController
 * @version 0.0.1
 */

angular.module('app').controller('DatasetsController', [
'Rest', 'Helpers', 'DatasetHelpers', '$routeParams',
function(Rest, Helpers, Dataset, $routeParams) {

	var self = this;
	self.httpStatus = 2;
	self.display = null;
	self.formatFecha = function(s) { if(s) return s.substring(0, 4); }

	var url = '/apiv1/datasets/' + $routeParams.id;
	Rest.add(url + '?nombreFuentes=true&nombreContribuidor=true&nombreEstadistica=true')
	.add(url + '/nacional')
	.add(url + '/estatal')
	.add(url + '/municipal')
	.load(function(err, res) {
		if(err)  {
			self.httpStatus = 1;
		} else {
			self.dataset = res[0];
			self.dataset.nacional = res[1];
			self.dataset.estatal = res[2];
			self.dataset.municipal = res[3];
			self.table = Dataset.toTable([self.dataset]);
			self.map = Dataset.toMap(self.dataset);
			self.display = 'tabla';
			self.httpStatus = 0;
		}
	});

}]);

/**
 * @name ApiV1Controller
 * @version 0.0.1
 */

angular.module('app').controller('ApiV1Controller', [
'Rest', '$document',
function(Rest, $document) {

	var self = this;

	self.api = {};
	self.base = 'http://politiquer.io/apiv1/';

	Rest.add('/static/json/apiv1.json').load(function(err, res) {
		self.api = res[0];
	});

}]);

/**
 * @name DocsController
 * @version 0.0.1
 */

angular.module('app').controller('DocsController', [
function() {

	var self = this;

	self.youtube_ids = {
		GRINGOS_LOCOS: 'RJeugIJFXas'
	}

}]);
