import express from "express";
import { getAllUsers, registerOneUser } from "~/controllers/users.controllers";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", registerOneUser);

export default router;
