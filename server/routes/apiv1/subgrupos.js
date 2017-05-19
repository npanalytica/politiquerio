const DB = require('./../../dbhelpers');
const Subgrupos = require('./../../model/v1/subgrupos');

module.exports = {
	configure: function(app) {

		app.get("/apiv1/subgrupos/:id?", function(req, res) {
			req.query = req.query || {};
			DB.respond(res, Subgrupos.get, [req.params.id, req.query]);
		});

		app.get("/apiv1/subgrupos/:id/estadisticas", function(req, res) {
			req.query = req.query || {};
			isNaN(req.params.id) ? req.sendStatus(901) :
			DB.respond(res, Subgrupos.getEstadisticas, [req.params.id, req.query]);
		});
	}
};
