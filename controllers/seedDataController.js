
const fs = require('fs');

const Tour = require('../models/tourModel');

const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const createDataTour = async (req, res) => {
   try {
      if(process.env.NODE_ENV !== 'development') {
         return res.status(404).json();
      }
      await Tour.deleteMany();
      await Tour.create(tours);
      return res.status(200).json({
         status: 'success',
         message: 'Seed data executed!'
      })
   } catch (error) {
      console.log(error);
   }
}

module.exports = {
   createDataTour
}