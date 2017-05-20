/**
 * @name line-graph-controller
 * @version 0.0.1
 *
**/

angular.module('app').controller('LineChartController', [
'$scope', '$timeout', 'ChartHelpers',
function($scope, $timeout, ChartHelpers) {

	var self = this;

	self.id = Math.floor(Math.random() * 1000000);
	var chart = null;

	$scope.$watch(function() {
		return self.datasets;
	}, function(_datasets) {
		if(_datasets) $timeout(function() { drawChart() });
	});

	$scope.$watch(function() {
		return self.type;
	}, function(_type) {
		if(self.datasets) $timeout(function() { drawChart() });
	});

	function drawChart(type, labels, datasets) {

		type = type || self.type;
		labels = labels || self.labels;
		datasets = datasets || self.datasets;

		var ctx = document.getElementById("mychart");

		if(chart) chart.destroy();

		chart = new Chart(ctx, {
			type: self.type,
			data: {
				labels: labels,
				datasets: datasets
			},
    		options: {
				responsive: true,
				legend: { position: 'bottom' },
        		scales: { yAxes: [{ticks: { beginAtZero:true }}]},
				onClick: chartClick
    		}
		});

	}

	function chartClick(x, data) {
		if(data && self.type == 'line' && self.datasets.length > 1) {
			var index = data[0]._index;
			self.type = 'bar';
			var ds = ChartHelpers.zoomDatasets(index, self.datasets, true);
			drawChart(self.type, [self.labels[index]], ds);
		}
	}

}]);
