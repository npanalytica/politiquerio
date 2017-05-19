const _ = require('underscore');
const DB = require('./../../dbhelpers');
const Q = require('q');

const Subgrupos = require('./subgrupos');

module.exports.makeSelect = function(query) {
	let sql = ["SELECT grupos.id, grupos.nombre, grupos.icono \
	FROM grupos WHERE TRUE"];
	return sql;
}

module.exports.get = function(con, id, query) {
	let d = Q.defer();
	let sql = module.exports.makeSelect(query);
	if(id) sql.push("AND grupos.id = ?");
	let promises = [DB.execute(con, sql.join(' '), [id])];

	if(query.subgrupos) {
		let m_sql = Subgrupos.makeSelect(query);
		if(id) m_sql.push("AND grupo_id = ?");
		promises.push(DB.execute(con, m_sql.join(' '), [id]));
	}

	Q.all(promises).then((res) => {
		if(query.subgrupos) {
			let fk = query.grupos ? 'grupo' : 'grupo_id';
			let prop = query.grupos ? 'nombre' : 'id';
			let subs = _.groupBy(res[1], fk);
			for(var i = 0; i < res[0].length; i++) {
				res[0][i].subgrupos = subs[res[0][i][prop]];
			}
		}
		d.resolve(res[0]);
	}).catch((err) => {
		d.reject(err);
	});

	return d.promise;

	return DB.execute(con, sql.join(' '), [id]);
}

module.exports.getSubgrupos = function(con, id, query) {
	let d = Q.defer();
	let sql = Subgrupos.makeSelect(query);
	if(id) sql.push("AND subgrupos.grupo_id = ?");
	return DB.execute(con, sql.join(' '), [id]);
}
