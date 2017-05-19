const DB = require('./../../dbhelpers');
const Datasets = require('./../../model/v1/datasets');

module.exports = {
	configure: function(app) {

		/** @desc - regresa los datasets atados a la estadistica **/
		app.get("/apiv1/datasets/:id/", function(req, res) {
			req.query = req.query || {};
			isNaN(req.params.id) ? res.sendStatus(901) :
			DB.respond(res, Datasets.get, [req.params.id, req.query]);
		});

		/** @desc - regresa los datasets atados a la estadistica **/
		app.get("/apiv1/datasets/:id/nacional/", function(req, res) {
			req.query = req.query || {};
			isNaN(req.params.id) ? res.sendStatus(901) :
			DB.respond(res, Datasets.getNacionales, [req.params.id, req.query]);
		});

		/** @desc - regresa los datasets atados a la estadistica **/
		app.get("/apiv1/datasets/:id/estatal/", function(req, res) {
			req.query = req.query || {};
			isNaN(req.params.id) ? res.sendStatus(901) :
			DB.respond(res, Datasets.getEstatales, [req.params.id, req.query]);
		});

		/** @desc - regresa los datasets atados a la estadistica **/
		app.get("/apiv1/datasets/:id/municipal/", function(req, res) {
			req.query = req.query || {};
			isNaN(req.params.id) ? res.sendStatus(901) :
			DB.respond(res, Datasets.getMunicipales, [req.params.id, req.query]);
		});

	}
};
