const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  passWord: {
    type: String,
    minlength: 5
  }
});

module.exports = mongoose.model("users", UserSchema);
