/**
 * @name line-graph-controller
 * @version 0.0.1
 *
**/

angular.module('app').controller('LineGraphController', [
'ChartDatasetMaker', 'ChartHelpers',
function(ChartDatasetMaker, ChartHelpers) {

	var self = this;

	var ctx = document.getElementById("myChart");
	self.chart = null;

	self.shit = function() {
		draw();
	}

	var datasets = [
		{label: 'Jalisco', data: [1,2,3]},
		{label: 'Veracruz', data: [4,2,1]},
		{label: 'Nuevo León', data: [1,5,3]},
		{label: 'Chihuahua', data: [4,2,1]},
		{label: 'Tamaulipas', data: [1,1,3]},
		{label: 'México', data: [6,3,1]}
	]


	function draw() {
		var labels = ['1995', '2000', '2005'];
		var ds = ChartDatasetMaker.makeLineDatasets(datasets);
		self.chart = ChartHelpers.makeChart(ctx, 'line', labels, ds);
	}

}]);
