/**
 * @name search-bar-controller
 * @version 0.0.1
 *
**/

angular.module('app').controller('SearchBarController', [
'$timeout', 'Search',
function($timeout, Search) {
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
		self.chart_type = 'map';
		self.mapa_dataset_id = self.result.datasets_con_estados[self.result.datasets_con_estados.length - 1].id;
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
