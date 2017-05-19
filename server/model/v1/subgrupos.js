const _ = require('underscore');
const DB = require('./../../dbhelpers');
const Q = require('q');

const Estadisticas = require('./estadisticas');

module.exports.makeSelect = function(query) {
	let sql = ["SELECT subgrupos.id, subgrupos.nombre"];
	let joins = [];

	// Estados
	if(query.grupos) {
		sql.push(", grupos.nombre AS grupo");
		joins.push("JOIN grupos ON grupos.id = subgrupos.grupo_id");
	} else {
		sql.push(", subgrupos.grupo_id");
	}

	sql.push("FROM subgrupos");
	sql = sql.concat(joins);
	sql.push("WHERE TRUE");

	return sql;
}

module.exports.get = function(con, id, query) {
	let d = Q.defer();
	query = query || {};
	let sql = module.exports.makeSelect(query);
	if(id) sql.push("AND subgrupos.id = ?");
	let promises = [DB.execute(con, sql.join(' '), [id])];

	if(query.estadisticas) {
		let e_sql = Estadisticas.makeSelect(query);
		if(id) e_sql.push("AND subgrupo_id = ?");
		promises.push(DB.execute(con, e_sql.join(' '), [id]));
	}

	Q.all(promises).then((res) => {
		if(query.estadisticas) {
			let fk = query.subgrupos ? 'subgrupo' : 'subgrupo_id';
			let prop = query.subgrupos ? 'nombre' : 'id';
			let subs = _.groupBy(res[1], fk);
			for(var i = 0; i < res[0].length; i++) {
				res[0][i].estadisticas = subs[res[0][i][prop]];
			}
		}
		d.resolve(res[0]);
	}).catch((err) => {
		d.reject(err);
	});

	return d.promise;

	return DB.execute(con, sql.join(' '), [id]);
}

module.exports.getEstadisticas = function(con, id, query) {
	let d = Q.defer();
	let sql = Estadisticas.makeSelect(query);
	if(id) sql.push("AND estadisticas.subgrupo_id = ?");
	return DB.execute(con, sql.join(' '), [id]);
}
