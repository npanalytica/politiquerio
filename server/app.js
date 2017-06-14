'use strict';

let express = require('express');
let bodyparser = require('body-parser');
var boolParser = require('express-query-boolean');
let app = express();

app.use(bodyparser.urlencoded({limit: '5000mb', extended: true}));
app.use(bodyparser.json({limit: '5000mb'}));
app.use(boolParser());

let connection = require('./database');
connection.init();



// Static routes
app.use('/', express.static(__dirname + './../app/'));
app.use('/static', express.static(__dirname + './../static/'));
app.use('/node', express.static(__dirname + './../node_modules/'));
app.use('/bower', express.static(__dirname + './../bower_components/'));

require('./routes/apiv1/_routes').configure(app);

let cache = require('./cache');
console.log('Inicializando politiquer.io. Esto puede tardar unos minutos...');
cache.init().then(() => {
	let server = app.listen(8000, function() {
		console.log('Politiquerío está corriendo en el puerto '
			+ server.address().port);
	});
}).catch((err) => {
	console.log('Error al iniciar politiquer.io', err);
});



module.exports = app; // For testing
