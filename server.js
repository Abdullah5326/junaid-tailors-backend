import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5000;

const DB_URL =
  process.env.DB_TYPE === "local"
    ? process.env.LOCAL_DB_URL
    : process.env.CLOUD_DB_URL;

console.log(DB_URL);
// Connect DB
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(process.env.DB_TYPE + "✅ MongoDB connected");

    // Start server AFTER DB connects
    app.listen(PORT, "localhost", () => {
      console.log(`🔥 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });
