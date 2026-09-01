const mongoose = require("mongoose");
const env = require("./env");

mongoose.set("strictQuery", true);

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri);

    console.log("Database connected!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
