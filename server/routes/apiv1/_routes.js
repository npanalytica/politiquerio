module.exports = {
	configure: function(app) {
		require('./datasets').configure(app);
		require('./estadisticas').configure(app);
		require('./estados').configure(app);
		require('./municipios').configure(app);
		require('./meta').configure(app);
		require('./grupos').configure(app);
		require('./search').configure(app);
		require('./subgrupos').configure(app);
	}
}
