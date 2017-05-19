const DB = require('./../../dbhelpers');
const search = require('./../../scripts/search/_search');

module.exports = {
	configure: function(app) {

		app.get("/apiv1/search/:string", function(req, res) {
			DB.respond(res, search, req.params.string);
		});

	}
}
