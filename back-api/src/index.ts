import express from "express";
import userRoutes from "./routes/users.routes";
import publicationRoutes from "./routes/publications.routes";
import cors from "cors";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();

export const app = express();

app.use(express.json());
app.use(cors());

/**
 * declaring routes
 */
app.use("/api/images", express.static(path.join(__dirname, "../images")));
app.use("/api/users", userRoutes);
app.use("/api/publications", publicationRoutes);

app.listen(process.env.API_PORT, () => {
  console.log("🚀 Server is launching...");
  console.log(
    `Server is running on : ${process.env.DEV_ENV}:${process.env.API_PORT}`
  );
});
