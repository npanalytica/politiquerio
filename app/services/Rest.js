/**
 * @name: Rest.js
 * @desc: Handles all api requests.
**/

angular.module('app').service('Rest', [
'$q', '$http', 'config',
function($q, $http, config) {

	function makePromises(requests) {
		var promises = [];
		for(var i = 0; i < requests.length; i++) {
			var promise = null;
			promise = $http[requests[i].method]
				(config.host + requests[i].path, requests[i].params);
			promises.push(promise);
		}
		return promises;
	}

	return {
		requests: [],
		add: function(path, method, params) {
			method = method || 'get';
			params = params || null;
			var request = {
				path: path,
				method: method,
				params: params
			}
			this.requests.push(request);
			return this;
		},
		load: function(callback) {
			var promises = makePromises(this.requests);
			$q.all(promises).then(function(result) {
				callback(null, _.pluck(result, 'data'));
			}, function(error) {
				callback(error.status, null);
			});
		}

	}
}]);
