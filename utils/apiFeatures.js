
class APIFeatures {

   constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
   }

   filter() {
      //* 1A. Filtering
      const queryObj = { ...this.queryString };
      const excludeFields = ['page', 'sort', 'limit', 'fields'];
      excludeFields.forEach(element => delete queryObj[element]);
      //* 1B. Advance Filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
      // console.log(JSON.parse(queryStr));
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
   }

   sort() {
      const { sort } = this.queryString;
      if (sort) {
         this.query = this.query.sort(sort.split(',').join(' '));
      }
      return this;
   }

   limitFields() {
      const { fields } = this.queryString;
      if (fields) {
         this.query = this.query.select(fields.split(',').join(' '));
      } else {
         this.query = this.query.select('-__v');
      }
      return this;
   }

   paginate() {
      const page = Number(this.queryString.page) || 1;
      const limit = Number(this.queryString.limit) || 100;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
   }

}

module.exports = {
   APIFeatures
}