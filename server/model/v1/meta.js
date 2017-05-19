const DB = require('./../../dbhelpers');

module.exports.getCuentas = function(con) {
	let sql = "select estadisticas, datasets, datos FROM cuentas_view";
	return DB.execute(con, sql, [], 'get_one');
}
