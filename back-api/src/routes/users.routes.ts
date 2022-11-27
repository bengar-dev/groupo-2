import express from "express";
import { authVerification } from "../middlewares/user.jwt.auth";
import {
  getAllUsers,
  getOneUser,
  getUserInfoByToken,
  registerOneUser,
  signInUser,
} from "~/controllers/users.controllers";

const router = express.Router();

router.get("/", authVerification, getAllUsers);
router.get("/userinfo", authVerification, getUserInfoByToken);
router.get("/:id", authVerification, getOneUser);
router.post("/signup", registerOneUser);
router.post("/signin", signInUser);

export default router;
