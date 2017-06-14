/**
 * @desc: Éste archivo es un diccionario de conceptos. Las keys son palabras
 * que escribe el usuario, y sus values son los conceptos que éstas representan.
*/

module.exports = {
	ABSTRACTOS: {		// default
		'sujeto': 		['conceptos', 'lugares', 'sujetos'],
		'subordinado': 	['conceptos', 'estados', 'municipios', 'personas', 'entidades'],
		'cardinalidad': ['lista', 'individual'],
		'concepto': 	['datos', 'jerarquia'],
		'subconcepto':	['datos', 'mayor', 'menor'],
	},
	IDEAS: {
		'cual':			['individual'],
		'cuales':		['lista', 'lugares'],
		'donde':		['lugares'],
		'estado':		['estados', 'individual'],
		'estados':		['estados', 'lista'],
		'peor':			['jerarquia', 'menor'],
		'peores':		['jerarquia', 'menores'],
		'quien':		['personas', 'individual'],
		'quienes':		['personas', 'lista'],
		'mas':			['jerarquia', 'mayor'],
		'mayor':		['jerarquia', 'mayor'],
		'mejor':		['jerarquia', 'mayor'],
		'mejores':		['jerarquia', 'mayor'],
		'menos':		['jerarquia', 'menor'],
		'menor':		['jerarquia', 'menor'],
		'municipio':	['municipios', 'individual'],
		'municipios':	['municipios', 'lista'],
	}
}
