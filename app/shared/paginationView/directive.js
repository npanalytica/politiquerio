/**
 * @name pagination-view
 * @version 0.0.1
 *
**/

angular.module('app').directive('paginationView', function() {
	return {
		restrict: 'E',
		scope: {
			pagination: '=',
		},
		templateUrl: '/shared/paginationView/view.html'
	}
});
