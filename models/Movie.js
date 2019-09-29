const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movie = {
  director_Id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: [true, "`{PATH}` alanı zorunludur"],
    maxlength: 10,
    minlength: 3
  },
  category: String,
  country: String,
  year: Number,
  imdb_score: Number,
  date: {
    type: Date,
    default: Date.now
  }
};

const MovieSchema = new Schema(movie);

module.exports = mongoose.model("movie", MovieSchema);
