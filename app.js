
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');
const seedData = require('./routes/seedDataRoutes');

const app = express();

if(process.env.NODE_ENV === 'development'){
   app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   next();
})

app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', usersRouter);

app.use('/api/v1/seed', seedData);

module.exports = app;
