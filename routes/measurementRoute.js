import express from "express";
import {
  getAllMeasurements,
  createMeasurement,
  getMeasurement,
  updateMeasurement,
  deleteMeasurement,
} from "../controllers/measurementController.js";
const router = express.Router();

router.route("/").get(getAllMeasurements).post(createMeasurement);

router
  .route("/:id")
  .get(getMeasurement)
  .patch(updateMeasurement)
  .delete(deleteMeasurement);

export default router;
