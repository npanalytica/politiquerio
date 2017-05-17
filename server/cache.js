const _ = require('underscore');
const Q = require('q');
const connection = require('./database');

const Geo = require('./model/Geo');
const Estadisticas = require('./model/Estadisticas');

function Cache() {
	this.data = null;
	// Initialize the connection
	this.init = function() {
		var self = this;
		connection.acquire(function(err, con) {
			let pGeo = Geo.getEstadosMunicipios(con, {}).then((q) => {
				return Q(q);
			});
			let pStats = Estadisticas.getEstadisticas(con, {}).then((q) => {
				return Q(q);
			});
			let pCuentas = Estadisticas.getCuentas(con, {}).then((q) => {
				return Q(q);
			});
			Q.all([pGeo, pStats, pCuentas]).then((res) => {
				let municipios = _.flatten(_.pluck(res[0], 'municipios'));
				res[0].forEach((e) => { delete e.municipios; });
				let estados = res[0];
				let estadisticas = res[1];
				self.data = {
					estados: res[0],
					municipios: municipios,
					estadisticas: estadisticas,
					cuentas: res[2]
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	};
}

module.exports = new Cache();
