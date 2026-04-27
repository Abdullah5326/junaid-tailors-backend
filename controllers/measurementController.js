import Measurement from "../models/measurementModel.js";
import {
  getAll,
  createOne,
  updateOne,
  deleteOne,
  getOne,
} from "../controllers/handleFactory.js";

export const getAllMeasurements = getAll(Measurement);
export const createMeasurement = createOne(Measurement);
export const updateMeasurement = updateOne(Measurement);
export const deleteMeasurement = deleteOne(Measurement);
export const getMeasurement = getOne(Measurement);
