import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use(
  "/api-chating-video-call",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
