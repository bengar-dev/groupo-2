import { app } from "..";
import userRoutes from "./users.routes";

app.use("/api/users", userRoutes);
