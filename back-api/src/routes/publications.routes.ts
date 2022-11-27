import express from "express";
import {
  deleteOnePublication,
  getAllPublications,
  postOnePublication,
} from "~/controllers/publications.controller";
import { authVerification } from "~/middlewares/user.jwt.auth";

const multer = require("~/middlewares/multer.upload");
const router = express.Router();

router.get("/", authVerification, getAllPublications);
router.post("/", authVerification, multer, postOnePublication);
router.delete("/:id", authVerification, deleteOnePublication);

export default router;
