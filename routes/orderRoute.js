import express from "express";
import {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").get(getAllOrders).post(createOrder);

router.route("/:id").get(getOrder).patch(updateOrder).delete(deleteOrder);

export default router;
