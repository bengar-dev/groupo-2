import express from "express";
import userRoutes from "./routes/users.routes";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

export const app = express();

app.use(express.json());
app.use(cors());

/**
 * declaring routes
 */
app.use("/api/users", userRoutes);

app.listen(process.env.API_PORT, () => {
  console.log("🚀 Server is launching...");
  console.log(
    `Server is running on : ${process.env.DEV_ENV}:${process.env.API_PORT}`
  );
});
