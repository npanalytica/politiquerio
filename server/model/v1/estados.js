const _ = require('underscore');
const DB = require('./../../dbhelpers');
const Q = require('q');

const Municipios = require('./municipios');

module.exports.makeSelect = function(query) {
	let sql = ["SELECT estados.id, estados.nombre FROM estados WHERE TRUE"];
	return sql;
}

module.exports.get = function(con, id, query) {
	let d = Q.defer();
	query = query || {};
	let sql = module.exports.makeSelect(query);
	if(id) sql.push("AND estados.id = ?");
	let promises = [DB.execute(con, sql.join(' '), [id])];

	if(query.municipios) {
		let m_sql = Municipios.makeSelect(query);
		if(id) m_sql.push("AND estado_id = ?");
		promises.push(DB.execute(con, m_sql.join(' '), [id]));
	}

	Q.all(promises).then((res) => {
		if(query.municipios) {
			let fk = query.estados ? 'estado' : 'estado_id';
			let prop = query.estados ? 'nombre' : 'id';
			let muns = _.groupBy(res[1], fk);
			for(var i = 0; i < res[0].length; i++) {
				res[0][i].municipios = muns[res[0][i][prop]];
			}
		}
		d.resolve(res[0]);
	}).catch((err) => {
		d.reject(err);
	});

	return d.promise;

	return DB.execute(con, sql.join(' '), [id]);
}

module.exports.getMunicipios = function(con, id, query) {
	let sql = Municipios.makeSelect(query);
	sql.push("AND estado_id = ?");
	return DB.execute(con, sql.join(' '), [id]);
}
