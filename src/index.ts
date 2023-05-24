import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import { initDB } from "./db";

const startApp = async () => {
  const PORT = process.env["PORT"];
  const server = http.createServer(app);

  try {
    await initDB();
    console.log("Server connected to the DB");

    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

    server.on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
  } catch (err) {
    console.log((err as Error).message);
    process.exit(1);
  }
};

startApp();
