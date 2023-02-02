
const Tour = require('../models/tourModel');
const { APIFeatures } = require('../utils/apiFeatures');


const getAllTours = async (req, res) => {
   try {

      //*Class implementing
      const features = new APIFeatures(Tour.find(), req.query)
         .filter()
         .sort()
         .limitFields()
         .paginate();

      //*Execute Query
      const tours = await features.query;

      //*Send response
      res
         .status(200)
         .json({
            status: 'success',
            results: tours.length,
            data: {
               tours
            }
         })
   } catch (error) {
      res.status(404).json({
         status: 'fail',
         message: error
      })
   }
}

const getTourById = async (req, res) => {
   try {
      const { id } = req.params;
      const tour = await Tour.findById(id);
      return res.status(200)
         .json({
            status: 'success',
            data: {
               tour
            }
         })
   } catch (error) {
      res.status(400).json({
         status: 'fail',
         message: error
      })
   }
}

const createTour = async (req, res) => {
   try {
      const newTour = await Tour.create(req.body);
      res.status(201).json({
         status: 'success',
         data: {
            tour: newTour
         }
      })
   } catch (error) {
      res.status(400).json({
         status: 'fail',
         message: error
      })
   }
}

const updateTour = async (req, res) => {
   try {
      const { id } = req.params;
      const data = req.body;
      const tour = await Tour.findByIdAndUpdate(id, data, { new: true });
      return res.status(200).json({
         status: 'success',
         data: {
            tour
         }
      })
   } catch (error) {
      res.status(400).json({
         status: 'fail',
         message: error
      })
   }
}

const deleteTour = async (req, res) => {
   try {
      const { id } = req.params;
      await Tour.findOneAndDelete(id);
      return res.status(204).json({
         status: 'success',
         data: null
      })
   } catch (error) {
      res.status(400).json({
         status: 'fail',
         message: error
      })
   }
}

const getToursStats = async (req, res) => {
   try {
      const stats = await Tour.aggregate([
         {
            $match: { ratingsAverage: { $gte: 4.5 } }
         },
         {
            $group: {
               // _id: 'null',
               _id: '$difficulty',
               numTours: { $sum: 1 },
               numRatings: { $sum: '$ratingsQuantity' },
               avgRating: { $avg: '$ratingsAverage' },
               avgPrice: { $avg: '$price' },
               minPrice: { $min: '$price' },
               maxPrice: { $max: '$price' },
            }
         },
         {
            $sort: { avgPrice: 1 }
         },
         // {
         //    $match: { _id: { $ne: 'easy' } }
         // }
      ])
      return res.status(200).json({
         status: 'success',
         data: {
            stats
         }
      })
   } catch (error) {
      res.status(400).json({
         status: 'fail',
         message: error
      })
   }
}

const getMonthlyPlan = async (req, res) => {
   try {
      const year = req.params.year * 1;
      const plan = await Tour.aggregate([
         {
            $unwind: '$startDates'
         },
         {
            $match: {
               startDates: {
                  $gte: new Date(`${year}-01-01`),
                  $lte: new Date(`${year}-12-31`)
               }
            }
         },
         {
            $group: {
               _id: { $month: '$startDates' },
               numToursStarts: { $sum: 1 },
               tours: { $push: '$name' }
            }
         },
         {
            $addFields: { month: '$_id' }
         },
         {
            $project: {
               _id: 0
            }
         },
         {
            $sort: { numToursStarts: -1 }
         },
         {
            $limit: 6
         }
      ])
      return res.status(200).json({
         status: 'success',
         data: {
            plan
         }
      })
   } catch (error) {
      res.status(400).json({
         status: 'fail',
         message: error
      })
   }
}

module.exports = {
   createTour,
   deleteTour,
   getAllTours,
   getMonthlyPlan,
   getTourById,
   getToursStats,
   updateTour,
}