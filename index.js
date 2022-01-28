const express = require('express');
const app = express();
const port = 3005;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
