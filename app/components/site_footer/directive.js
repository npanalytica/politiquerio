/**
 * @name site-footer
 * @version 0.0.1
 *
**/

angular.module('app').directive('siteFooter', function() {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: '/components/site_footer/view.html'
	}
});
