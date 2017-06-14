/**
 * @name: chart_dataset_maker
 * @desc: Turns <Dataset> arrays into Chart.js dataset arrays
**/

angular.module('app').service('Entidades', [
'Rest', 'Helpers',
function(Rest, Helpers) {

	var entidades = {
		estados: null,
		municipios: null,
		estados_dict: null,
		municipios_dict: null
	}

	if(!entidades.estados) {
		Rest.add('/apiv1/estados').add('/apiv1/municipios')
		.load(function(err, res) {
			entidades.estados = res[0];
			entidades.municipios = res[1];
			entidades.estados_dict = Helpers.dictionarify(res[0]);
			entidades.municipios_dict = Helpers.dictionarify(res[1]);
		})
	}
	
	return entidades;

}]);
