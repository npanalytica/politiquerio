/**
 * @name dataset-view
 * @version 0.0.1
 *
**/

angular.module('app').directive('datasetView', function() {
	return {
		restrict: 'E',
		scope: {
			estados: '=',
			municipios: '=',
			datasets: '='
		},
		controller: 'DatasetViewController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/components/dataset_view/view.html'
	}
});
