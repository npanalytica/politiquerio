angular.module('app').service('Static', [function(){
	return {
		colors: [
			'#d1495b', //Secondary color
			'#4679B2', //Primary color
			'#7bab38', //Light green
			'#5290a3', //Light blue
			'#6d406b', //Purple
			'#29406b', //Dark blue
			'#2c7348', //Green
			'#849a5a', //Soap green
			'#b09048', //Orange
			'#20426b', //Dark blue
			'#e49b33', //Light orange
			'#745574', //Mint purple
			'#653c65', //Dark mint purple
			'#a4d4ff', //Super light blue
			'#283845', // Gray blue
			'#333333', //Gray
		],
		light_colors: [
			'#eb6375', //Secondary color
			'#6093cc', //Primary color
			'#95c552', //Light green
			'#6caabd', //Light blue
			'#875a85', //Purple
			'#435a85', //Dark blue
			'#2c7348', //Green
			'#468d62', //Soap green
			'#caaa62', //Orange
			'#3a5c85', //Dark blue
			'#feb54d', //Light orange
			'#8e6f8e', //Mint purple
			'#7F567f', //Dark mint purple
			'#Beeeff', //Super light blue
			'#42525f', // Gray blue
			'#4d4d4d', //Gray
		],
		meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
			'Agosto', 'Septiemre', 'Octubre', 'Noviembre', 'Diciembre'],
		letras: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
				 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
			 	 'y', 'z']
	}
}]);
