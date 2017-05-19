const _ = require('underscore');
const fs = require('fs');

const DB = require('./../../dbhelpers');
const Estados = require('./../../model/v1/estados');

module.exports = {
	configure: function(app) {

		app.get("/apiv1/estados/:id?/geojson/", function(req, res) {
			fs.readFile('static/geojson/estados.json', 'utf8', (err, data) => {
				if(err) {
					res.sendStatus(500);
				} else {
					let result = JSON.parse(data).objects.states;
					if(req.params.id) {
						let search = _.filter(result.geometries, function(g) {
								return (g.properties.state_code == req.params.id);
						});
						result.geometries = search;
					}
					res.send(result.geometries);
				}
			});
		});

		app.get("/apiv1/estados/:id?", function(req, res) {
			req.query = req.query || {};
			DB.respond(res, Estados.get, [req.params.id, req.query]);
		});

		app.get("/apiv1/estados/:id/municipios", function(req, res) {
			req.query = req.query || {};
			isNaN(req.params.id) ? res.sendStatus(901) :
			DB.respond(res, Estados.getMunicipios, [req.params.id, req.query]);
		});

		app.get("/apiv1/estados/:id/municipios/geojson/", function(req, res) {
			if(isNaN(req.params.id)) return res.sendStatus(901);
			fs.readFile('static/geojson/municipios.json', 'utf8', (err, data) => {
				if(err) {
					res.sendStatus(500);
				} else {
					let result = JSON.parse(data);
					res.send(result[req.params.id]);
				}
			});
		});

	}
}
