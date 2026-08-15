const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

// database connection
module.exports = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database is connected!");
  })
  .catch((error) => {
    console.log(`${error} \n Database connection failed!`);
  });
