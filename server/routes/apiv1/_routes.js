module.exports = {
	configure: function(app) {
		require('./estadisticas').configure(app);
		require('./geo').configure(app);
		require('./search').configure(app);
	}
}
