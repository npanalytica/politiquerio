/**
 * @name line-graph
 * @version 0.0.1
 *
**/

angular.module('app').directive('lineGraph', function() {
	return {
		restrict: 'E',
		scope: {
			labels: '=',
			nombre: '=',
			valores: '=',
			height: '=',
			width: '='
		},
		controller: 'LineGraphController',
		controllerAs: 'vm',
		templateUrl: '/shared/lineGraph/view.html'
	}
});
