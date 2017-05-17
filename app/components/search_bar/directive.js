/**
 * @name search-bar
 * @version 0.0.1
 *
**/

angular.module('app').directive('searchBar', function() {
	return {
		restrict: 'E',
		scope: {
			errorMessage: '=?',
			httpStatus: '=',
			margin: '@?'
		},
		controller: 'SearchBarController',
		controllerAs: 'vm',
		templateUrl: '/components/search_bar/view.html'
	}
});
