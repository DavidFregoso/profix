const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user')
const supplierRoutes = require('./routes/supplier');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/supplier', supplierRoutes);
app.use('/user', userRoutes);

module.exports = app;