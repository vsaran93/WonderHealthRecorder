const app = require('./app');
const mongoose = require('./config/db');
const { port } = require('./config/var');

mongoose.connect();

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

