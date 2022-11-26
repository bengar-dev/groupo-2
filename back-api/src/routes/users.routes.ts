import express from "express";
import {
  getAllUsers,
  getOneUser,
  registerOneUser,
} from "~/controllers/users.controllers";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.post("/signup", registerOneUser);

export default router;
