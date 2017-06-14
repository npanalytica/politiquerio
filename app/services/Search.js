/**
 * @name: Rest.js
 * @desc: Handles all api requests.
**/

angular.module('app').service('Search', [
'Rest', 'ChartHelpers',
function(Rest, ChartHelpers) {
	return {
		search: function(needle, callback) {
			Rest.add('/apiv1/search/' + needle).load(function(err, res) {
				callback(err, res);
			});
		}
	}

}]);
