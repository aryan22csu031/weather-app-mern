const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/', authRoutes);
app.use('/', weatherRoutes);
app.use('/', reportRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
