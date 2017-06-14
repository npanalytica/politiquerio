/**
 * @name ApiV1Controller
 * @version 0.0.1
 */

angular.module('app').controller('ApiV1Controller', [
'Rest', '$document',
function(Rest, $document) {

	var self = this;

	self.api = {};
	self.base = 'http://politiquer.io/apiv1/';

	Rest.add('/static/json/apiv1.json').load(function(err, res) {
		self.api = res[0];
	});

}]);
