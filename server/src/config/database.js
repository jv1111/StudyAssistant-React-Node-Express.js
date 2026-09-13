const dns = require("dns");
const mongoose = require("mongoose");
const env = require("./env");

if (env.nodeEnv === "development") {
  dns.setServers(["192.168.1.1"]);
  console.log("DNS server: 192.168.1.1 (development)");
}

console.log("DNS after:", dns.getServers());

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
