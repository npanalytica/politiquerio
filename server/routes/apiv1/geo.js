const DB = require('./../../dbhelpers');
const Geo = require('./../../model/Geo');

module.exports = {
	configure: function(app) {

		app.get("/apiv1/estados", function(req, res) {
			if(req.query.municipios) {
				DB.respond(res, Geo.getEstadosMunicipios, [req.query]);
			} else {
				DB.respond(res, Geo.getEstados, [req.query]);
			}
		});

		app.get("/apiv1/municipios", function(req, res) {
			DB.respond(res, Geo.getMunicipios, [req.query]);
		});

		app.get("/apiv1/estados/:id/municipios/", function(req, res) {
			req.query.estado_id = req.params.id;
			DB.respond(res, Geo.getMunicipios, [req.query]);
		});

		app.get("/apiv1/estados/:id/", function(req, res) {
			req.query.id = req.params.id;
			DB.respond(res, Geo.getEstados, [req.query]);
		});

	}
}
