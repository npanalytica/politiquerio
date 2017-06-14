/**
 * @name table-view-controller
 * @version 0.0.1
 *
**/

angular.module('app').controller('TableViewController', [
'$scope', 'DatasetHelpers', 'Helpers',
function($scope, Dataset, Helpers) {

	var self = this;

	self.three_columns = [0, 5, 10];

	self.sort = {index: 2, reverse: false};

	self.table = [];
	self.pagination = Helpers.generatePagination(0, 15, 15);

	$scope.$watch(function() {
		return self.view;
	}, function() {
		self.pagination.update(self.table.data[self.view].length);
	});

	self.setView = function(v) {
		if((v != 'estados' && !self.table.has_mun_data) || v > 1000) return;
		self.view = v;
	}

	self.sortFunc = function(item) {
		var valor = item[self.sort.index] || 0;
		return self.sort.index == 1 ? valor : -parseInt(valor);
	}

}]);
