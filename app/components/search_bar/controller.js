/**
 * @name search-bar-controller
 * @version 0.0.1
 *
**/

angular.module('app').controller('SearchBarController', [
'$timeout', 'Rest',
function($timeout, Rest) {
	var self = this;

	self.search = {
		text: 'suicidios en Jalisco',
		status: 0,
		result: null
	}

	self.estadistica = null;

	self.setEstadistica = function(estadistica) {
		self.estadistica = estadistica;
		$timeout(function() { draw(); });
		if(estadistica.$$latest) return false;
		estadistica.$$latest = _.max(estadistica.datos, function(dato) {
			return parseInt(dato.fecha.substring(0, 4));
		});
	}

	self.updateSearch = function($e) {
		if($e.keyCode != 13) return;
		self.search.status = 2;
		Rest.add('/apiv1/search/' + self.search.text).load(function(err, res) {
			if(err) {
				self.search.status = 1;
			} else {
				self.search.result = res[0];
				for(var i = 0; i < res[0].estadisticas.length; i++) {
					if(res[0].estadisticas[i].datos.length > 0) {
						self.setEstadistica(res[0].estadisticas[i]);
						break;
					}
				}
				self.search.status = 0;
			}
		});
	}

	function draw() {
		var ctx = document.getElementById("myChart");
		var ordered = [];
		var colors = [];
		for(var i = 0; i < self.estadistica.datos.length; i++) {
			ordered.push({
				label: parseInt(self.estadistica.datos[i].fecha.substring(0, 4)),
				valor: self.estadistica.datos[i].valor
			});
			colors.push('#4679b2');
		}
		ordered = _.sortBy(ordered, 'label');
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: _.pluck(ordered, 'label'),
				datasets: [{
					label: self.estadistica.estadistica.nombre,
					data: _.pluck(ordered, 'valor'),
					backgroundColor: '#d1495b',
					pointBackgroundColor: '#fff',
					pointBorderColor: '#B83042',
            		borderWidth: 2
        		}]
    		},
    		options: {
        		scales: { yAxes: [{ticks: { beginAtZero:true }}]}
    		}
		});
	}

}]);
