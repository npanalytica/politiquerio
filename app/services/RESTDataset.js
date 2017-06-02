/**
 * @name: RestDataset.js
 * @desc: Handles all api requests.
**/

angular.module('app').service('RESTDataset', [
'Rest', 'Helpers',
function(Rest, Helpers) {
	return {
		requests: [],
		loadData: function(ds) {
			Rest.add('/apiv1/datasets/' + ds.id + '/nacional/')
			.add('/apiv1/datasets/' + ds.id + '/estatal/')
			.add('/apiv1/datasets/' + ds.id + '/municipal/')
			.load(function(err, res) {
				if(!err) {
					ds.nacional = res[0];
					ds.estatal = res[1];
					ds.estatal_dict = Helpers.dictionarify(res[1], 'estado_id');
					ds.municipal = res[2];
					ds.municipal_dict = Helpers.dictionarify(res[2], 'municipio_id');
				}
			})
		},
	}
}]);
