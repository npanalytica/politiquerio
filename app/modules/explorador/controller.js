/**
 * @name ExploradorController
 * @version 0.0.1
 */

angular.module('app').controller('ExploradorController', [
'Rest', 'RESTDataset', 'Helpers', 'Static',
function(Rest, RESTDataset, Helpers, Static) {

	var self = this;

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
	}

}]);
