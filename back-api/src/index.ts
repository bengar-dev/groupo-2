import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send(`test`));

app.listen(process.env.API_PORT, () => {
  console.log("🚀 Server is launching...");
  console.log(
    `Server is running on : ${process.env.DEV_ENV}:${process.env.API_PORT}`
  );
});
