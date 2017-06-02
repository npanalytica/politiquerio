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
