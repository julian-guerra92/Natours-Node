
const fs = require('fs');

const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkId = (req, res, next, val) => {
   console.log(`Tour id is: ${val}`);
   const tour = tours.find(tour => tour.id === Number(req.params.id));
   if (!tour) {
      return res.status(404)
         .json({
            status: 'Fail',
            message: 'Invalid ID'
         })
   }
   next();
}

const checkBody = (req, res, next) => {
   const { name, price } = req.body;
   if (!name || !price) {
      return res.status(404)
         .json({
            status: 'Fail',
            message: 'Information is missing'
         })
   }
   next();
}

const aliasTopTours = (req, res, next) => {
   req.query.limit = '5';
   req.query.sort = '-ratingsAverage,price';
   req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
   next();
}

module.exports = {
   checkId,
   checkBody,
   aliasTopTours
}