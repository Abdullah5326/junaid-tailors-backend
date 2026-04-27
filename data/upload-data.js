import mongoose from "mongoose";
import fs from "fs";
import Order from "../models/orderModel.js";
import Measurement from "../models/measurementModel.js";
import User from "../models/userModel.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const measurements = JSON.parse(
  fs.readFileSync(`${__dirname}/measurements.json`, "utf-8"),
);
const orders = JSON.parse(fs.readFileSync(`${__dirname}/orders.json`, "utf-8"));

async function importItems() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/junaid-tailors");
    console.log("Local database is successfully connected.");
    await Measurement.deleteMany();
    await Order.deleteMany();
    await Measurement.insertMany(measurements);
    await Order.insertMany(orders);
    console.log("Measurements and Orders are uploaded successfully");
  } catch (error) {
    console.error("Error uploading data:", error);
  } finally {
    process.exit();
  }
}

importItems();
