/**
 * @name site-footer
 * @version 0.0.1
 *
**/

angular.module('app').controller('SiteFooterController', [
'Helpers', function(Helpers) {
}]);

angular.module('app').directive('siteFooter', function() {
	return {
		restrict: 'E',
		scope: {},
		controller: 'SiteFooterController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/components/site_footer/view.html'
	}
});

/**
 * @name top-nav
 * @version 0.0.1
 *
**/

angular.module('app').directive('topNav', function() {
	return {
		restrict: 'E',
		templateUrl: '/components/top_nav/view.html'
	}
});

/**
 * @name search-bar-controller
 * @version 0.0.1
 *
**/

angular.module('app').controller('SearchBarController', [
'$scope', 'Rest', 'Helpers', 'DatasetHelpers', '$timeout', 'Search',
'Entidades', 'ChartHelpers',
function($scope, Rest, Helpers, Dataset, $timeout, Search, Entidades, ChartHelpers) {
	var self = this;

	self.search = {
		text: '',
		status: 3
	}

	$scope.$watch(function() {
		return self.preQuery;
	}, function(_prequery) {
		if(!_prequery) return;
		self.search.text = _prequery;
		self.updateSearch({keyCode: 13});
	})

	self.updateSearch = function($e) {
		if($e.keyCode != 13) return;
		if(self.search.text.length == 0) return;
		self.search.status = 2;
		Search.search(self.search.text, function(err, data) {
			if(err) {
				self.search.status = 1;
			} else {
				self.resultado = data[0];
				self.display = 'respuesta';
				self.table = Dataset.toTable([self.resultado.dataset]);
				self.map = Dataset.toMap(self.resultado.dataset);
				self.chart = Dataset.toLineChart(self.resultado.datasets);
				self.search.status = 0;
			}

		});
	}

}]);

/**
 * @name search-bar
 * @version 0.0.1
 *
**/

angular.module('app').directive('searchBar', function() {
	return {
		restrict: 'E',
		scope: {
			preQuery: '=',
		},
		controller: 'SearchBarController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/components/search_bar/view.html'
	}
});

/**
 * @name dataset-view-controller
 * @version 0.0.1
 *
**/

angular.module('app').controller('DatasetViewController', [
'DatasetHelpers', 'ChartHelpers',
function(Dataset, ChartHelpers) {
	var self = this;
	self.display = 'table';

	self.showMap = function(index) {
		self.map_dataset = Dataset.toMap(self.table, index);
		self.display = 'map';
	}

	self.hideMap = function() {
		self.map_dataset = null;
		self.display = 'table';
	}
}]);

/**
 * @name dataset-view
 * @version 0.0.1
 *
**/

angular.module('app').directive('datasetView', function() {
	return {
		restrict: 'E',
		scope: {
			estados: '=',
			municipios: '=',
			datasets: '='
		},
		controller: 'DatasetViewController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/components/dataset_view/view.html'
	}
});

/**
 * @name dataset-custom-column
 * @version 0.0.1
 *
**/

angular.module('app').controller('DatasetTableController', [
'$scope', 'DatasetHelpers', 'Helpers', 'Static',
function($scope, Dataset, Helpers, Static) {
	var self = this;

	var ITEMS_PER_PAGE = 10;

	self.table = {};
	self.sort = {reverse: false, index: 1};
	self.table_display = 0;
	self.pagination = null;
	self.letras = Static.letras;

	$scope.$watch(function() {
		return self.limit;
	}, function(_limit) {
		if(_limit) self.pagination = {items_per_page: _limit};
	});

	self.sortBy = function(index) {
		if(index == self.sort.index) {
			self.sort.reverse = !self.sort.reverse;
		} else {
			self.sort.index = index;
			self.sort.reverse = false;
		}
	}

	self.sortFunc = function(item) {
		return self.sort.index == 1 ? item[1] : -parseInt(item[self.sort.index]);
	}

	$scope.$watch(function() {
		return self.datasets;
	}, function(_datasets) {
		if(_datasets) {
		 	self.table = Dataset.makeTable(_datasets,
				self.estados, self.municipios);
			self.pagination = Helpers.generatePagination(self.table.data[0].length,
				ITEMS_PER_PAGE);
		}
	});

	self.updateDisplay = function(index) {
		if(index > 0 && !self.table.has_mun_data) return;
		self.table_display = index;
		self.pagination.update(self.table.data[index].length);
	}

	self.mapClick = function(index) {
		if(self.showMap) self.showMap({index: index});
	}

	self.downloadCSV = function() {
		var matrix = [self.table.headers].concat(self.table.data[self.table_display]);
		console.log(matrix);
		var csv = matrix.map(function(d) {
			return JSON.stringify(d);
		}).join('\n').replace(/(^\[)|(\]$)/mg, '');
		console.log(csv);
		textEncoder = new TextEncoder('utf-8');
		var csvContentEncoded = textEncoder.encode([csv]);
		var blob = new Blob([csvContentEncoded], {type: 'text/csv;charset=utf-8;'});
		saveAs(blob, 'tabla.csv');
	}
}]);


angular.module('app').directive('datasetTable', function() {
	return {
		restrict: 'E',
		scope: {
			estados: '=',
			municipios: '=',
			datasets: '=',
			showMap: '&',
			table: '=',
			limit: '=',
		},
		controller: 'DatasetTableController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/components/dataset_view/_dataset_table.html'
	}
});

/**
 * @name respuesta-display
 * @version 0.0.1
 *
**/

angular.module('app').controller('respuestaDisplayController', [
'$scope', '$sce', 'Responder', function($scope, $sce, Responder) {
	var self = this;
	self.floor = Math.floor;

	self.respuesta = 'No sé encontró una respuesta... :(';

	$scope.$watch(function() {
		return self.dataset;
	}, function(ds) {
		setRespuesta(ds);
	});

	function setRespuesta(ds) {
		if(self.ideas.concepto == 'jerarquia') {
			if(self.dataset.estatal.length==0 && self.dataset.municipal==0) {
				self.respuesta = Responder.datos(self.dataset, self.ideas,
					self.estados, self.municipios);
			} else {
				self.respuesta = Responder.jerarquia(self.dataset, self.ideas);
			}
		} else if(self.ideas.concepto == 'datos') {
			self.respuesta = Responder.datos(self.dataset, self.ideas,
				self.estados, self.municipios);
		}
	}

	self.formatFecha = function(s) {
		if(!s) return '';
		return s.substring(0, 4);
	}

}]);

angular.module('app').directive('respuestaDisplay', function() {
	return {
		restrict: 'E',
		scope: {
			ideas: '=',
			dataset: '=',
			estados: '=',
			municipios: '=',
			estadistica: '=',
		},
		controller: 'respuestaDisplayController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/components/search_bar/_respuesta_display.html'
	}
});

/**
 * @name respuesta-meta
 * @version 0.0.1
 *
**/

angular.module('app').controller('respuestaMetaController', ['Entidades',
function(Entidades) {

	var self = this;

	self.links = ['respuesta', 'tabla', 'mapa', 'histórico'];

	self.setDisplay = function(d) { self.display = d; }

}]);

angular.module('app').directive('respuestaMeta', function() {
	return {
		restrict: 'E',
		scope: {
			estadisticas: '=',
			display: '='
		},
		controller: 'respuestaMetaController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/components/search_bar/_respuesta_meta.html'
	}
});
