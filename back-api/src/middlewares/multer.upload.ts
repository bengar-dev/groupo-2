import { Request } from "express";
import multer from "multer";

/**
 * extension allowed
 */
const MIMES_TYPES: any = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/gif": "gif",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback) => {
    callback(null, "images");
  },
  filename: (req: Request, file: Express.Multer.File, callback) => {
    const name = file.originalname.split(" ").join("_");
    const clearExtension = name.split(".").join("_");
    const extension = MIMES_TYPES[file.mimetype];
    callback(null, clearExtension + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage }).single("img");
