const DB = require('./../../dbhelpers');

module.exports.makeSelect = function(query) {
	let sql = ["SELECT datos_nacionales.valor, datos_nacionales.dataset_id \
		FROM datos_nacionales WHERE TRUE"];
	return sql;
}

module.exports.getHistory = function(con, fuente_id, estadistica_id,
query) {
	let sql = module.exports.makeSelect(query);
	let params = [fuente_id, estadistica_id];
	let joins = [];
	sql.push("AND dataset_id IN (SELECT id FROM datasets \
		WHERE fuente_id = ? AND estadistica_id = ?)");
	return DB.execute(con, sql.join(' '), params);
}
