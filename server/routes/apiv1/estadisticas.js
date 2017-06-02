const _ = require('underscore');
const DB = require('./../../dbhelpers');
const Estadisticas = require('./../../model/v1/estadisticas');
const Fuentes = require('./../../model/v1/fuentes');
const cache = require('./../../cache');

module.exports = {
	configure: function(app) {

		/** @desc - regresa los datasets atados a la estadistica **/
		app.get("/apiv1/estadisticas/:id?", function(req, res) {
			req.query = req.query || {};
			DB.respond(res, Estadisticas.get, [req.params.id, req.query]);
		});

		/** @desc - regresa los datasets atados a la estadistica **/
		app.get("/apiv1/estadisticas/search/:search", function(req, res) {
			req.query = req.query || {};
			DB.respond(res, Estadisticas.search, [req.params.search]);
		});

		/** @desc - regresa los datasets atados a la estadistica **/
		app.get("/apiv1/estadisticas/:id/datasets/", function(req, res) {
			if(isNaN(req.params.id)) res.sendStatus(901);
			req.query = req.query || {};
			DB.respond(res, Estadisticas.getDatasets, [req.params.id, req.query]);
		});

		/** @desc - regresa las fuentes que tienen datasets atadas a la estadistica **/
		app.get("/apiv1/estadisticas/:id/fuentes/", function(req, res) {
			if(isNaN(req.params.id)) res.sendStatus(901);
			req.query = req.query || {};
			DB.respond(res, Estadisticas.getFuentes, [req.params.id, req.query]);
		});

		/** @desc - regresa las fuentes que tienen datasets atadas a la estadistica **/
		app.get("/apiv1/estadisticas/:id/fuentes/:fuente_id/historico/:type/",
		function(req, res) {
			if(isNaN(req.params.id)) res.sendStatus(901);
			if(isNaN(req.params.fuente_id)) res.sendStatus(901);
			if(!_.contains(['nacional', 'estatal', 'municipal'],
				req.params.type)) res.sendStatus(404);
			req.query = req.query || {};
			DB.respond(res, Fuentes.getHistory, [req.params.type,
				req.params.fuente_id, req.params.id, req.query]);
		});
	}
};
