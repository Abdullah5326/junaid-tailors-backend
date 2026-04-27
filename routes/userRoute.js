import express from "express";
import {
  signup,
  login,
  logout,
  protect,
  getMe,
} from "../controllers/authController.js";
import { getAllUsers, getUser } from "../controllers/userController.js";
const   router = express.Router();

router.get("/", protect, getAllUsers)
router.get("/me", protect, getMe)
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/:id", protect, getUser)

export default router;
