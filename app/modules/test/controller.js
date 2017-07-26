/**
 * @name BuscarController
 * @version 0.0.1
 */

angular.module('app').controller('TestController', [
'Rest',
function(Rest) {

	var self = this;

	Rest.add('/static/json/test.json').load(function(err, res) {
		self.test = res[0];
		console.log(self.test);
	});

	console.log('controller loaded');

}]);
