const DB = require('./../../dbhelpers');
const Grupos = require('./../../model/v1/grupos');

module.exports = {
	configure: function(app) {

		app.get("/apiv1/grupos/:id?", function(req, res) {
			req.query = req.query || {};
			DB.respond(res, Grupos.get, [req.params.id, req.query]);
		});

		app.get("/apiv1/grupos/:id/subgrupos", function(req, res) {
			req.query = req.query || {};
			isNaN(req.params.id) ? req.sendStatus(901) :
			DB.respond(res, Grupos.getSubgrupos, [req.params.id, req.query]);
		});
	}
};
