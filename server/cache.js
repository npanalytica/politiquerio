const _ = require('underscore');
const Q = require('q');
const connection = require('./database');

const Estados = require('./model/v1/estados');
const Municipios = require('./model/v1/municipios');
const Estadisticas = require('./model/v1/estadisticas');
const Meta = require('./model/v1/meta');

function Cache() {
	this.data = null;
	// Initialize the connection
	this.init = function() {
		let d = Q.defer();
		var self = this;
		connection.acquire(function(err, con) {
			let pEdos = Estados.get(con, null, {}).then((q) => {
				return Q(q);
			});
			let pMuns = Municipios.get(con, null, {}).then((q) => {
				return Q(q);
			});
			let pStat = Estadisticas.get(con, null, {}).then((q) => {
				return Q(q);
			});
			let pCount = Meta.getCuentas(con).then((q) => {
				return Q(q);
			});
			Q.all([pEdos, pMuns, pStat, pCount]).then((res) => {
				let stats = res[2];
				for(let i = 0; i < stats.length; i++) {
					stats[i].keywords = stats[i].keywords.split(', ');
				}
				self.data = {
					estados: res[0],
					municipios: res[1],
					estadisticas: stats,
					cuentas: res[3]
				}
				d.resolve();
			}).catch((err) => {
				d.reject(err);
				console.log(err);
			});
		});
		return d.promise;
	};
}

module.exports = new Cache();
