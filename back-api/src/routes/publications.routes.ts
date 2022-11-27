import express from "express";
import {
  getAllPublications,
  postOnePublication,
} from "~/controllers/publications.controller";
import { authVerification } from "~/middlewares/user.jwt.auth";

const multer = require("~/middlewares/multer.upload");
const router = express.Router();

router.get("/", authVerification, getAllPublications);
router.post("/", authVerification, multer, postOnePublication);

export default router;
