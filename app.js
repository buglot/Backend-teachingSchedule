const express = require('express');
const cors = require('cors');
const peterRoutes = require('./task/peter');
const frameRoutes = require('./task/frame');
const fahRoutes = require('./task/fah');

const app = express();
const port = 4133;

app.use(cors());
app.use(express.json());

app.use('/api', peterRoutes);
app.use('/api', frameRoutes);
app.use('/api', fahRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
