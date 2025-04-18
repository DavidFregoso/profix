const express = require('express');
const cors = require('cors');
const supplierRoutes = require('./routes/supplier');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/supplier', supplierRoutes);

module.exports = app;