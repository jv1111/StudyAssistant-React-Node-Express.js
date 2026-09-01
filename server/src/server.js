const env = require("./config/env");
const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = env.port;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
