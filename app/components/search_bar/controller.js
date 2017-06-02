/**
 * @name search-bar-controller
 * @version 0.0.1
 *
**/

angular.module('app').controller('SearchBarController', [
'Rest', 'DatasetHelpers', '$timeout', 'Search',
function(Rest, Dataset, $timeout, Search) {
	var self = this;

	self.search = {
		text: '',
		status: 0,
		result: null
	}

	self.chart_type = 'line';

	self.setEstadistica = function(result) {
		self.result = result;
	}

	self.setMapDataset = function() {
		var dataset_id = self.result.datasets_con_estados
		[self.result.datasets_con_estados.length - 1].id;
		Rest.add('/apiv1/datasets/' + dataset_id + '/estatal/')
		.add('/apiv1/datasets/' + dataset_id + '/municipal/')
		.load(function(err, res) {
			self.map_dataset = Dataset.toMap2(res[0], res[1]);
			self.chart_type = 'map';
		});
	}

	self.updateSearch = function($e) {
		if($e.keyCode != 13) return;
		//self.search.status = 2;
		Search.search(self.search.text, function(err, data) {
			self.result = data[0];
			self.results = data;
			self.chart_type = 'line';
		});
	}

}]);
