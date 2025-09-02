// server.js — start http server after DB connects
require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connectDB, closeDB } = require("./scr/DB/index");

const PORT = Number(process.env.PORT || 3000);
const server = http.createServer(app);

async function start() {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });

    // graceful shutdown
    const shutdown = async () => {
      console.log("Shutting down...");
      server.close();
      await closeDB();
      process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
