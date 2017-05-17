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

let cache = require('./cache');
cache.init();

// Static routes
app.use('/', express.static(__dirname + './../app/'));
app.use('/static', express.static(__dirname + './../static/'));
app.use('/node', express.static(__dirname + './../node_modules/'));
app.use('/bower', express.static(__dirname + './../bower_components/'));

require('./routes/apiv1/_routes').configure(app);

let server = app.listen(8000, function() {
	console.log('Server listening on port ' + server.address().port);
});

module.exports = app; // For testing
