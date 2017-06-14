/**
 * @name: Respuestas.js
 * @desc: Regresa una simple cadena de texto que (ojalá) responde la pregunta
 * del usuario
**/

angular.module('app').service('Responder', [
'Entidades', 'Helpers',
function(Entidades, Helpers) {

	var N_PLURAL = 3; 	// El número de estados/municipios que responden a una
						// pregunta en plural

	function datosEntidades(dataset, entidades, tipo) {
		var ids = _.pluck(entidades, 'id');
		var id = tipo == 'estatal' ? 'estado_id' : 'municipio_id';
		var nombre = tipo == 'estatal' ? 'estado' : 'municipio';
		var resultados = _.filter(dataset[tipo], function(ds) {
			return _.contains(ids, ds[id]);
		});
		resultados = Helpers.sort(resultados, 'mayor');
		var res = '<table class="respuesta-tabla">';
		for(var i = 0; i < resultados.length; i++) {
			res += "<tr><td class='respuesta-celda'>"
			+ "<span class='font-primary'>" + (i + 1) + ".&nbsp;</span>"
			+ "<span class='font-secondary'>"
			+ resultados[i][nombre];
			if(tipo == 'municipal') {
				var e_id = Math.floor(resultados[i].municipio_id / 1000);
				res += ', ' + Entidades.estados_dict[e_id].nombre;
			}
			res += "</span></td><td class='respuesta-celda'>"
			+ resultados[i].valor.toLocaleString() + "</td></tr>";
		}
		return res + '</table>';
	}

	function jerarquiaEntidades(_arr, ideas, tipo) {
		if(_arr.length == 0) return '';
		if(	ideas.subordinado != 'conceptos' &&
			ideas.subordinado != (tipo + 's') &&
			ideas.sujeto != 'lugares') return '';
		var respuesta = '';
		var last_index = ideas.cardinalidad == 'lista' ? N_PLURAL : 1;
		if(ideas.sujeto == 'lugares') {
			respuesta = '<span class="font-secondary">'
			+ tipo.charAt(0).toUpperCase()
			+ tipo.slice(1) + 's: </span>';
		}
		var pedazos = [];
		var arr = Helpers.sort(_arr, ideas.subconcepto);
		for(var i = 0; i < last_index; i++) {
			var pedazo = arr[i][tipo];
			if(tipo == 'municipio') {
				var e_id = Math.floor(arr[i].municipio_id / 1000);
				pedazo += ', ' + Entidades.estados_dict[e_id].nombre;
			}
			pedazo += ' '
			+ ' <span class="font-afterthought">('
			+ arr[i].valor.toLocaleString()
			+ ')</span>';
			pedazos.push(pedazo);
		}
		return respuesta + Helpers.juntarLista(pedazos);
	}

	return {
		datos: function(dataset, ideas, estados, municipios) {
			switch(ideas.subordinado) {
				case 'pais':
					return "<span class='font-secondary'>"
					+ "México</span>&nbsp;<i class='ion-arrow-right-c'></i>"
					+ "&nbsp;" + dataset.nacional[0].valor.toLocaleString();
					break;
				case 'estados':
					return datosEntidades(dataset, estados, 'estatal');
					break;
				case 'municipios':
					return datosEntidades(dataset, municipios, 'municipal');
					break;
			}
		},
		jerarquia: function(dataset, ideas) {
			var e = jerarquiaEntidades(dataset.estatal, ideas, 'estado');
			var m = jerarquiaEntidades(dataset.municipal, ideas, 'municipio');
			return ideas.sujeto == 'lugares' ? e + '<br/>' + m : e + m;
		}
	}

}]);
