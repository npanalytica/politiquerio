/**
 * @name: chart_dataset_maker
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('ChartHelpers', [
'Static',
function(Static) {
	return {
		makeDataset: function(label, data, color) {
			if(!isNaN(color)) {
				color = Static.colors[color % Static.colors.length];
			}
			return {
				label: label,
				data: data,
				fill: false,
				borderColor: color,
				pointBorderColor: color,
				backgroundColor: color,
				hoverBackgroundColor: color,
				borderWidth: 2
			}
		},

		zoomDatasets: function(index, ds, sort) {
			var self = this;
			var zoom = [];
			for(var i = 0; i < ds.length; i++) {
				zoom.push(self.makeDataset(ds[i].label, [ds[i].data[index]], i));
			}
			if(sort) {
				zoom = _.sortBy(zoom, function(z) { return -z.data[0] });
			}
			return zoom;
		}
	}
}]);
