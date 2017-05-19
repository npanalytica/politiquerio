const _ = require('underscore');
const fs = require('fs');

const DB = require('./../../dbhelpers');
const Municipios = require('./../../model/v1/municipios');

module.exports = {
	configure: function(app) {

		app.get("/apiv1/municipios/geojson", function(req, res) {
			fs.readFile('static/geojson/municipios.json', 'utf8', (err, data) => {
				if(err) {
					res.sendStatus(500);
				} else {
					data = JSON.parse(data);
					res.send(_.flatten(_.values(data)));
				}
			});
		});

		app.get("/apiv1/municipios/:id?", function(req, res) {
			req.query = req.query || {};
			DB.respond(res, Municipios.get, [req.params.id, req.query]);
		});

		app.get("/apiv1/municipios/:id/geojson/", function(req, res) {
			if(isNaN(req.params.id)) return res.sendStatus(901);
			req.params.id = parseInt(req.params.id);
			fs.readFile('static/geojson/municipios.json', 'utf8', (err, data) => {
				if(err) {
					res.sendStatus(500);
				} else {
					data = JSON.parse(data);
					let result = {};
					for(estado_id in data) {
						let found = _.filter(data[estado_id], function(g) {
							let id = g.properties.state_code * 1000 +
								g.properties.mun_code;
							return id == req.params.id;
						});
						if(found.length == 1) {
							result = found;
							break;
						}
					}
					res.send(result);
				}
			});
		});

	}
}
