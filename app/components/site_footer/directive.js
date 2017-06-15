/**
 * @name site-footer
 * @version 0.0.1
 *
**/

angular.module('app').controller('SiteFooterController', [
'Helpers', function(Helpers) {
}]);

angular.module('app').directive('siteFooter', function() {
	return {
		restrict: 'E',
		scope: {},
		controller: 'SiteFooterController',
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: '/components/site_footer/view.html'
	}
});
