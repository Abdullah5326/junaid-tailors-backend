import User from "../models/userModel.js";
import { getAll, getOne } from "./handleFactory.js";

export const getAllUsers = getAll(User);
export const getUser = getOne(User);