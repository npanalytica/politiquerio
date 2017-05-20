/**
 * @name: helpers
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('Helpers', [
function(Helpers) {

	return {
		// turns an array into a dictionary, with key @prop -> default: id
		dictionarify: function(arr, prop) {
			if(!_.isArray(arr)) return null;
			prop = prop || 'id';
			dict = {};
			for(var i = 0; i < arr.length; i++) {
				dict[arr[i][prop]] = arr[i];
			}
			return dict;
		}
	}
}]);
