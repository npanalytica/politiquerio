/**
 * @name http-loader
 * @version 0.0.1
 *
**/

angular.module('app').directive('httpLoader', function() {
	return {
		restrict: 'E',
		scope: {
			status: '=',
			message: '='
		},
		templateUrl: '/shared/httpLoader/view.html'
	}
});
