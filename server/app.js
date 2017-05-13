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
app.use('/', express.static(__dirname + '/app/'));

require('./routes/apiv1/_routes').configure(app);

let server = app.listen(8000, function() {
	console.log('Server listening on port ' + server.address().port);
});

module.exports = app; // For testing
