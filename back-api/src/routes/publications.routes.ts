import express from "express";
import { likeDislikePublication } from "~/controllers/likes.controller";
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
router.post("/:publicationId/likes", authVerification, likeDislikePublication);

export default router;
