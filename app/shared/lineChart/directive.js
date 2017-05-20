/**
 * @name line-graph
 * @version 0.0.1
 *
**/

angular.module('app').directive('lineChart', function() {
	return {
		restrict: 'E',
		scope: {
			type: '=',
			labels: '=',
			datasets: '=',
			height: '=',
			width: '='
		},
		controller: 'LineChartController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/shared/lineChart/view.html'
	}
});
