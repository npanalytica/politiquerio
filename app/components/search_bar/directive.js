/**
 * @name search-bar
 * @version 0.0.1
 *
**/

angular.module('app').directive('searchBar', function() {
	return {
		restrict: 'E',
		scope: {},
		controller: 'SearchBarController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/components/search_bar/view.html'
	}
});
