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
