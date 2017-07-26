const _ = require('underscore');
const DB = require('./../../dbhelpers');
const Personas = require('./../../model/v1/personas');

module.exports = {
	configure: function(app) {

		app.get("/apiv1/personas/:id/cargo", function(req, res) {
			DB.respond(res, Personas.getCargo, [req.params.id, req.query]);
		});

		app.get("/apiv1/personas/:id/cargos", function(req, res) {
			DB.respond(res, Personas.getCargos, [req.params.id, req.query]);
		});

		app.get("/apiv1/personas/:id", function(req, res) {
			DB.respond(res, Personas.get, [req.params.id, req.query]);
		});

		app.get("/apiv1/personas/", function(req, res) {
			DB.respond(res, Personas.list, [req.query]);
		});

		app.get("/apiv1/personas/:id/opiniones/:tema_id", function(req, res) {
			DB.respond(res, Personas.getOpinion, [req.params.id, req.params.tema_id, req.query]);
		});

		app.get("/apiv1/personas/:id/opiniones", function(req, res) {
			DB.respond(res, Personas.getOpiniones, [req.params.id, req.query]);
		});


	}
};
