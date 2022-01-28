const express = require('express');
const app = express();

const mongoose = require('./config/db');
const { port } = require('./config/var');

mongoose.connect();

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
