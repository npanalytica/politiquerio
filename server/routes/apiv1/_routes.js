module.exports = {
	configure: function(app) {
		require('./datasets').configure(app);
		require('./estadisticas').configure(app);
		require('./estados').configure(app);
		require('./fuentes').configure(app);
		require('./municipios').configure(app);
		require('./personas').configure(app);
		require('./meta').configure(app);
		require('./grupos').configure(app);
		require('./search').configure(app);
		require('./subgrupos').configure(app);
		require('./temas').configure(app);
	}
}
