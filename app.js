import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoute.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import orderRoutes from "./routes/orderRoute.js";
import measurementRoutes from "./routes/measurementRoute.js";
import globalErrorHandler from "./controllers/errorController.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://junaid-tailors.netlify.app"],
    credentials: true,
  }),
);

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.send("Server is live");
});

app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/measurements", measurementRoutes);
app.use("/api/v1/users", userRoutes);


app.use(globalErrorHandler);

export default app;
