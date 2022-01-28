const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('./config/db');
const { port } = require('./config/var');

const routes = require('./routes');

mongoose.connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
