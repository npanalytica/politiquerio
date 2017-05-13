const DB = require('./../dbhelpers');
const Q = require('q');

function getGrupos(con, query) {
	let sql = "SELECT id, nombre FROM grupos";
	if(query.id) sql += " WHERE id = ?";
	return DB.execute(con, sql, [query.id]);
}
module.exports.getGrupos = getGrupos;

function getSubgrupos(con, query) {
	let sql = "SELECT id, nombre FROM subgrupos ";
	let param = [];
	if(query.grupo_id) {
		sql += "WHERE grupo_id = ?";
		param = [query.grupo_id];
	} else if(query.id) {
		param = [query.id];
		sql += "WHERE id = ?";
	}
	return DB.execute(con, sql, param);
}
module.exports.getSubgrupos = getSubgrupos;

function getEstadisticas(con, query) {
	let sql = "SELECT id, nombre, notas FROM estadisticas ";
	let param = [];
	if(query.subgrupo_id) {
		sql += "WHERE subgrupo_id = ?";
		param = [query.subgrupo_id];
	} else if(query.id) {
		param = [query.id];
		sql += "WHERE id = ?";
	}
	return DB.execute(con, sql, param);
}
module.exports.getEstadisticas = getEstadisticas;

function getFuenteById(con, id) {
	let sql = "SELECT fuentes.nombre, fuentes.fecha, fuentes.limpia, \
		estadisticas.nombre as estadistica FROM fuentes \
			JOIN estadisticas ON estadisticas.id = fuentes.estadistica_id \
		WHERE fuentes.id = ?";
	return DB.execute(con, sql, [id]);
}
module.exports.getFuenteById = getFuenteById;

function getFuentesByEstadistica(con, estadistica_id) {
	let sql = "SELECT nombre, fecha, notas, limpia \
		FROM fuentes WHERE estadistica_id = ?";
	return DB.execute(con, sql, [estadistica_id]);
}
module.exports.getFuentesByEstadistica = getFuentesByEstadistica;

function getDatosNacionales(con, fuente_id) {
	let sql = "SELECT valor FROM datos_nacionales WHERE fuente_id = ?";
	return DB.execute(con, sql, [fuente_id]);
}
module.exports.getDatosNacionales = getDatosNacionales;

function getDatosEstatales(con, fuente_id, query) {
	let sql = "SELECT datos_estatales.valor, ";
	if(query.nombres) {
		sql += "estados.nombre as estado FROM datos_estatales \
			JOIN estados ON estados.id = datos_estatales.estado_id ";
	} else {
		sql += "datos_estatales.estado_id FROM datos_estatales ";
	}
	sql += "WHERE datos_estatales.fuente_id = ?"
	return DB.execute(con, sql, [fuente_id]);
}
module.exports.getDatosEstatales = getDatosEstatales;

function getDatosMunicipales(con, fuente_id, query) {
	let sql = "SELECT datos_municipales.valor, ";
	if(query.nombres) {
		sql += "municipios.nombre as municipio FROM datos_municipales \
			JOIN municipios ON municipios.id = datos_municipales.municipio_id ";
	} else {
		sql += "datos_municipales.municipio_id FROM datos_municipales ";
	}
	sql += "WHERE datos_municipales.fuente_id = ?"
	return DB.execute(con, sql, [fuente_id]);
}
module.exports.getDatosMunicipales = getDatosMunicipales;

function getDatos(con, fuente_id, query) {
	let d = Q.defer();
	let pNacionales = getDatosNacionales(con, fuente_id);
	let pEstatales = getDatosEstatales(con, fuente_id, query);
	let pMunicipales = getDatosMunicipales(con, fuente_id, query);
	Q.all([pNacionales, pEstatales, pMunicipales]).then((result) => {
		d.resolve({
			nacional: result[0],
			estatal: result[1],
			municipal: result[2]
		});
	}).catch((err) => {
		d.reject(err);
	});
	return d.promise;
}
module.exports.getDatos = getDatos;
