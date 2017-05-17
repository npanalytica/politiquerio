const _ = require('underscore');
const Q = require('q');
const DB = require('./../dbhelpers');
const cache = require('./../cache');
const natural = require('natural');
const tokenizer = new natural.TreebankWordTokenizer();
const word_distance = require('./word_distance');
const Estadisticas = require('./../model/Estadisticas');

const SCORE_CUTOFF = 0.95;
const N_RES = 10;

function getGeo(haystack) {
	let estado = word_distance.getMatch(haystack, cache.data.estados);
	let municipio = word_distance.getMatch(haystack, cache.data.municipios);
	if(_.max([estado.score, municipio.score]) < SCORE_CUTOFF) {
		return {nombre: 'Nacional', table: 'datos_nacionales', id: null};
	} else if (municipio.score >= estado.score) {
		return {
			nombre: municipio.obj.nombre,
			table: 'datos_municipales',
			col: 'municipio_id',
			id: municipio.obj.id
		};
	} else {
		return {
			nombre: estado.obj.nombre,
			table: 'datos_estatales',
			col: 'estado_id',
			id: estado.obj.id
		};
	}
}

function getEstadisticas(haystack) {
	return word_distance.getMatches(N_RES, haystack, cache.data.estadisticas);
}

function getData(con, geo, estadisticas) {
	let d = Q.defer();
	let promises = [];
	for(var i = 0; i < estadisticas.length; i++) {
		// Select
		let params = [estadisticas[i].id];
		let sql = [];
		sql.push("SELECT fuentes.nombre, fuentes.fecha, fuentes.id,");
		sql.push(geo.table + ".valor");
		sql.push("FROM");
		sql.push(geo.table)
		sql.push("JOIN fuentes ON fuentes.id = ");
		sql.push(geo.table + ".fuente_id");
		sql.push("WHERE fuente_id IN (SELECT id from fuentes WHERE estadistica_id = ?)");
		if(geo.col) {
			sql.push("AND " + geo.col + " = ?");
			params.push(geo.id);
		}
		let sql_string = sql.join(' ');
		promises.push(DB.execute(con, sql_string, params).then((q) => {return Q(q)}));
	}
	Q.all(promises).then((res) => {
		d.resolve(res);
	}).catch((err) => {
		d.reject(err);
	});
	return d.promise;
}

module.exports = function(con, string) {
	let d = Q.defer();
	let haystack = tokenizer.tokenize(string);
	let geo = getGeo(haystack);
	let estadisticas = getEstadisticas(haystack);
	getData(con, geo, estadisticas).then((result) => {
		let res = {nombre: geo.nombre, estadisticas: []};
		for(var i = 0; i < estadisticas.length; i++) {
			res.estadisticas.push({
				estadistica: estadisticas[i],
				datos: result[i]
			});
		}
		d.resolve(res);
	}).catch((err) => {
		d.reject(err);
	});
	return d.promise;
}
