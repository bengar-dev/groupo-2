import express from "express";
import { authVerification } from "../middlewares/user.jwt.auth";
import {
  editUser,
  getAllUsers,
  getOneUser,
  getUserInfoByToken,
  registerOneUser,
  signInUser,
} from "~/controllers/users.controllers";

const router = express.Router();
const multer = require("~/middlewares/multer.upload");

router.get("/", authVerification, getAllUsers);
router.get("/userinfo", authVerification, getUserInfoByToken);
router.get("/:id", authVerification, getOneUser);
router.post("/signup", registerOneUser);
router.post("/signin", signInUser);
router.put("/edit-profil", authVerification, multer, editUser);

export default router;
