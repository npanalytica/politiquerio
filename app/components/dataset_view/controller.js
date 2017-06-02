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
