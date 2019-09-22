const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movie = {
  director_Id: Schema.Types.ObjectId,
  title: { type: String, requried: true },
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
