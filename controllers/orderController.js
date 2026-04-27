import Order from "../models/orderModel.js";
import {
  getAll,
  createOne,
  updateOne,
  deleteOne,
  getOne,
} from "../controllers/handleFactory.js";

export const getAllOrders = getAll(Order);
export const createOrder = createOne(Order);
export const updateOrder = updateOne(Order);
export const deleteOrder = deleteOne(Order);
export const getOrder = getOne(Order);
