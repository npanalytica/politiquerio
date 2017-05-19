/**
 * @name search-bar-controller
 * @version 0.0.1
 *
**/

angular.module('app').controller('SearchBarController', [
'$timeout', 'Search', 'ChartDatasetMaker',
function($timeout, Search, ChartDatasetMaker) {
	var self = this;

	self.search = {
		text: 'suicidios en Jalisco',
		status: 0,
		result: null
	}

	self.estadistica = null;

	var datasets = [
		{label: 'Jalisco', data: [1,2,3]},
		{label: 'Veracruz', data: [4,2,1]},
		{label: 'Nuevo León', data: [1,5,3]},
		{label: 'Chihuahua', data: [4,2,1]},
		{label: 'Tamaulipas', data: [1,1,3]},
		{label: 'México', data: [6,3,1]}
	]

	self.setEstadistica = function(result) {
		self.result = result;
		draw(result);
	}

	self.updateSearch = function($e) {
		if($e.keyCode != 13) return;
		//self.search.status = 2;
		Search.search(self.search.text, function(err, data) {
			self.result = data[0];
			self.results = data;
			$timeout(function() { draw(data[0]); });
		});
	}

	function draw(x) {
		var ctx = document.getElementById("myChart");
		var myChart = new Chart(ctx, {
			type: 'line',

			data: {
				labels: x.labels,
				datasets: x.datasets
    		},
    		options: {
				legend: { position: 'bottom' },
        		scales: { yAxes: [{ticks: { beginAtZero:true }}]}
    		}
		});
	}

}]);
