import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("🏠 Welcome home!"));

app.listen(8080, () => console.log("Silence, ça tourne. !!"));
