const _ = require('underscore');
const DB = require('./../../dbhelpers');
const Temas = require('./../../model/v1/temas');

module.exports = {
	configure: function(app) {
		app.get("/apiv1/temas", function(req, res) {
			DB.respond(res, Temas.list, [req.params.id, req.query]);
		});

		app.get("/apiv1/temas/:id", function(req, res) {
			DB.respond(res, Temas.get, [req.params.id, req.query]);
		});

		app.get("/apiv1/temas/:id/opiniones", function(req, res) {
			DB.respond(res, Temas.getOpiniones, [req.params.id, req.query]);
		});
	}
};
