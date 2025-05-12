require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
connectDB();

// middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// rutas
app.use('/provider',     require('./routes/provider.routes'));
app.use('/categories',   require('./routes/category.routes'));
app.use('/user',         require('./routes/user.routes'));
app.use('/appointments', require('./routes/appointment.routes'));
app.use('/jobs',         require('./routes/job.routes'));
app.use('/reviews',      require('./routes/review.routes'));

// 404 y errores
app.use('*', (req,res)=>res.status(404).json({message:'Not found'}));
app.use(errorHandler);

module.exports = app;
