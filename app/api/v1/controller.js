/**
 * @name ApiV1Controller
 * @version 0.0.1
 */

angular.module('app').controller('ApiV1Controller', [
'Rest', function(Rest) {
	Rest.add('/apiv1/estados?municipios=true').load(function(err, result) {
		console.log(result);
	});
	console.log('API Loaded');
}]);
