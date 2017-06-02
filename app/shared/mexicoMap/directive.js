/**
 * @name mexico-map
 * @version 0.0.1
 *
**/

angular.module('app').directive('mexicoMap', function() {
	return {
		restrict: 'E',
		scope: {
			dataset: '=',
			width: '='
		},
		controller: 'MexicoMapController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/shared/mexicoMap/view.html'
	}
});
