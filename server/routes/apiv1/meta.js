const Cache = require('./../../cache');
const DB = require('./../../dbhelpers');

module.exports = {
	configure: function(app) {

		/** @desc - regresa los datasets atados a la estadistica **/
		app.get("/apiv1/meta/cuentas/", function(req, res) {
			res.send(Cache.data.cuentas);
		});

	}
};
