const _ = require('underscore');
const Q = require('q');
const DB = require('./../../dbhelpers');

module.exports.get = function(con, id, query) {
	let sql = "SELECT * FROM personas WHERE id = ?";
	return DB.execute(con, sql, [id]);
}

module.exports.list = function(con, query) {
	let sql = "SELECT * FROM personas";
	return DB.execute(con, sql);
}

module.exports.getCargo = function(con, id, query) {
	let sql = "SELECT cargos.*, personas_cargos.fecha_inicio,\
	personas_cargos.fecha_fin FROM cargos\
	JOIN personas_cargos ON cargos.id = personas_cargos.cargo_id\
	WHERE cargos.id = (SELECT cargo_id FROM personas_cargos WHERE \
		fecha_fin is null AND persona_id = ?);";
	return DB.execute(con, sql, [id]);
}

module.exports.getCargos = function(con, id, query) {
	let sql = "SELECT cargos.*, personas_cargos.fecha_inicio,\
	personas_cargos.fecha_fin FROM cargos\
	JOIN personas_cargos ON cargos.id = personas_cargos.cargo_id\
	WHERE cargos.id IN (SELECT cargo_id FROM\
		personas_cargos WHERE persona_id = ?);";
	return DB.execute(con, sql, [id]);
}

module.exports.getOpinion = function(con, id, tema_id, query) {
	let d = Q.defer();
	let params = [id, tema_id];
	let sql_opinion = "SELECT temas_opiniones_personas.*, temas_opiniones.opinion\
		FROM temas_opiniones_personas\
		JOIN temas_opiniones ON temas_opiniones.id = temas_opiniones_personas.opinion_id\
		WHERE persona_id = ? AND temas_opiniones_personas.tema_id = ? ORDER BY fecha_final;";
	let sql_pruebas = "SELECT * FROM temas_opiniones_pruebas WHERE\
		opinion_persona_id IN (select id from temas_opiniones_personas\
		WHERE persona_id = ? AND tema_id = ?);";
	let p_opinion = DB.execute(con, sql_opinion, params).then((q) => { return Q(q); });
	let p_pruebas = DB.execute(con, sql_pruebas, params).then((q) => { return Q(q); });
	Q.all([p_opinion, p_pruebas]).then((res) => {
		let opiniones = res[0];
		let pruebas = res[1];
		opiniones.forEach((o) => {
			o.pruebas = _.where(pruebas, {opinion_persona_id: o.id});
		});
		d.resolve(opiniones);
	}).catch((err) => {
		d.reject(err);
	});
	return d.promise;
}

module.exports.getOpiniones = function(con, id, query) {
	let d = Q.defer();
	let sql = "SELECT * FROM temas WHERE id IN\
		(SELECT tema_id FROM temas_opiniones_personas WHERE persona_id = ?)";
	DB.execute(con, sql, [id]).then((temas) => {
		let promises = [];
		temas.forEach((t) => {
			promises.push(module.exports.getOpinion(con, id, t.id));
		});
		Q.all(promises).then((res2) => {
			let opiniones = _.flatten(res2);
			console.log(opiniones);
			temas.forEach((t) => {
				t.opiniones = _.where(opiniones, {tema_id: t.id});
			});
			d.resolve(temas);
		}).catch((err) => {
			d.reject(err);
		})
	}).catch((err) => {
		d.reject(err);
	});
	return d.promise;
}
