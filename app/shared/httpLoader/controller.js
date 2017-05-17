/**
 * @name http-loader
 * @version 0.0.1
 *
 * @param {int} httpStatus -
 *		0: Success (hide httpLoader)
 *		1: Error (show error)
 *		2: Loading (show gears)
**/

angular.module('app').directive('httpLoader', function() {
	return {
		restrict: 'E',
		scope: {
			errorMessage: '=?',
			httpStatus: '=',
			margin: '@?'
		},
		templateUrl: '/shared/httpLoader/view.html'
	}
});
