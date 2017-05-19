/**
 * @name: chart_dataset_maker
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('DatasetHelpers', [
function(DatasetHelpers) {
	return {

		makeDataset: function(_datos) {
			var data = _.sortBy(_datos, function(d) {
				return parseInt(d.fecha.substring(0,4));
			})
			var labels = _.map(_.pluck(_datos, 'fecha'), function(f) { return f.substring(0,4) });
			var data = _.pluck(data, 'valor');
			return {labels: labels, data: data};
		}

	}
}]);
