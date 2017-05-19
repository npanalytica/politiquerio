/**
 * @name: chart_dataset_maker
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('ChartDatasetMaker', [
'Static',
function(Static) {

	function makeDatasetsFromSearchResult(_datos) {
		var datos = _.sortBy(_datos, function(d) {
			return parseInt(d.fecha.substring(0,4));
		})
		var data = _.pluck(datos, 'valor');
		var labels = _.map(_.pluck(_datos, 'fecha'), function(f) {
			return f.substring(0,4);
		});
		return {labels: labels, data: data};
	}

	return {

		makeLineDatasets: function(_datos) {
			var _ds = makeDatasetsFromSearchResult(_datos);
			var datasets = [];
			for(var i = 0; i < _ds.data.length; i++) {
				var color = Static.colors[i % Static.colors.length];
				var light = Static.light_colors[i % Static.colors.length];
				datasets.push({
					label: _ds[i].label,
					data: _ds[i].data,
					fill: false,
					borderColor: color,
					pointBorderColor: color,
					backgroundColor: light,
					pointBackgroundColor: '#fff',
					borderWidth: 2
				});
			}
			if(_ds.length == 1) datasets[0].fill = true;
			return datasets;
		}

	}
}]);
