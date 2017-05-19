/**
 * @name: chart_dataset_maker
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('ChartHelpers', [
function() {

	

	return {

		makeChart: function(container, type, labels, datasets) {
			var new_chart = new Chart(container, {
				type: type,
				data: {labels: labels, datasets: datasets},
	    		options: {
	        		scales: { yAxes: [{ticks: { beginAtZero:true }}]}
	    		}
			});
			return new_chart;
		}

	}
}]);
