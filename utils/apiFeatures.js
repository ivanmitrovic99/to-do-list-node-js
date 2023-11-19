const AppError = require("./AppError");

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    let queryObj = { ...this.queryString };
    const excludedFields = ["page", "limit", "sort", "fields", "results"];
    excludedFields.forEach(el => delete queryObj[el]);
    const queryFields = Object.keys(this.query.schema.paths);
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|ne)\b/g, match => `$${match}`);
    queryObj = JSON.parse(queryStr);
    Object.keys(queryObj).forEach(el => {
      if (!queryFields.includes(el)) {
        throw new AppError(400, "Field name not recognized");
      }
    });

    this.query = this.query.find(queryObj);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitResults() {
    if (this.queryString.results) {
      this.query = this.query.limit(parseInt(this.queryString.results, 10));
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }
    return this;
  }

  paginate() {
    if (this.queryString.page && this.queryString.limit) {
      const page = parseInt(this.queryString.page, 10);
      const limit = parseInt(this.queryString.limit, 10);
      this.query = this.query.skip((page - 1) * limit).limit(limit);
    }
    return this;
  }
}
module.exports = ApiFeatures;
