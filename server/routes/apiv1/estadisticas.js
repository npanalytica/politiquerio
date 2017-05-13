const DB = require('./../../dbhelpers');
const Estadisticas = require('./../../model/Estadisticas');

module.exports = {
	configure: function(app) {

		app.get("/apiv1/grupos/:id?", function(req, res) {
			if(req.params.id) req.query.id = req.params.id;
			DB.respond(res, Estadisticas.getGrupos, [req.query]);
		});

		app.get("/apiv1/grupos/:id/subgrupos", function(req, res) {
			req.query.grupo_id = req.params.id;
			DB.respond(res, Estadisticas.getSubgrupos, [req.query]);
		});

		app.get("/apiv1/subgrupos/:id", function(req, res) {
			req.query.id = req.params.id;
			DB.respond(res, Estadisticas.getSubgrupos, [req.query]);
		});

		app.get("/apiv1/subgrupos/:id/estadisticas", function(req, res) {
			req.query.id = req.params.id;
			DB.respond(res, Estadisticas.getEstadisticas, [req.query]);
		});

		app.get("/apiv1/estadisticas/:id", function(req, res) {
			req.query.id = req.params.id;
			DB.respond(res, Estadisticas.getEstadisticas, [req.query]);
		});

		app.get("/apiv1/fuentes/:id", function(req, res) {
			isNaN(req.params.id) ? res.status(901).send() :
			DB.respond(res, Estadisticas.getFuenteById, [req.params.id]);
		});

		app.get("/apiv1/estadisticas/:id/fuentes", function(req, res) {
			isNaN(req.params.id) ? res.status(901).send() :
			DB.respond(res, Estadisticas.getFuentesByEstadistica,
				[req.params.id]);
		});

		app.get("/apiv1/fuentes/:id/datos", function(req, res) {
			isNaN(req.params.id) ? res.status(901).send() :
			DB.respond(res, Estadisticas.getDatos, [req.params.id, req.query]);
		});

		app.get("/apiv1/fuentes/:id/datos/nacionales", function(req, res) {
			isNaN(req.params.id) ? res.status(901).send() :
			DB.respond(res, Estadisticas.getDatosNacionales, [req.params.id]);
		});

		app.get("/apiv1/fuentes/:id/datos/estatales", function(req, res) {
			isNaN(req.params.id) ? res.status(901).send() :
			DB.respond(res, Estadisticas.getDatosEstatales, [req.params.id,
				req.query]);
		});

		app.get("/apiv1/fuentes/:id/datos/municipales", function(req, res) {
			isNaN(req.params.id) ? res.status(901).send() :
			DB.respond(res, Estadisticas.getDatosMunicipales, [req.params.id,
				req.query]);
		});

	}
}
