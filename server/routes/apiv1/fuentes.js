const _ = require('underscore');
const DB = require('./../../dbhelpers');
const Fuentes = require('./../../model/v1/fuentes');

module.exports = {
	configure: function(app) {

		app.get("/apiv1/fuentes/:id?", function(req, res) {
			req.query = req.query || {};
			DB.respond(res, Fuentes.get, [req.params.id, req.query]);
		});
	}
};
