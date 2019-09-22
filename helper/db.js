const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    // "mongodb+srv://mongo_user:abcd1234@movieapp-nx37g.mongodb.net/test?retryWrites=true&w=majority",
    "mongodb://mongo_user:abcd1234@ds341847.mlab.com:41847/heroku_ct6n730d",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  mongoose.connection.on("open", () => {
    console.log("MongoDb:Connected!");
  });

  mongoose.connection.on("error", error => {
    console.log("MongoDb:Disconnected! " + error);
  });

  mongoose.Promise = global.Promise;
};
