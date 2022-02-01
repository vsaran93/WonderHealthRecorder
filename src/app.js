const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.use('/api/v1', routes);

module.exports = app;