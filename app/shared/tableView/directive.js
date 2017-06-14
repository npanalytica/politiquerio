/**
 * @name table-view
 * @version 0.0.1
 *
**/

angular.module('app').directive('tableView', function() {
	return {
		restrict: 'E',
		scope: {
			view: '@',
			table: '='
		},
		controller: 'TableViewController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/shared/tableView/view.html'
	}
});
