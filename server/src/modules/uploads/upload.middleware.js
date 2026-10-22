import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { IMAGE_EXTENSIONS, LIMITS } from "../../config/constants.js";
import { badRequest } from "../../core/errors.js";

export const UPLOAD_DIR = path.resolve("public/uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename(_req, file, done) {
    const extension = path.extname(file.originalname).toLowerCase();
    const safe = IMAGE_EXTENSIONS.includes(extension) ? extension : ".jpg";
    done(null, `${Date.now()}-${crypto.randomBytes(4).toString("hex")}${safe}`);
  },
});

/** Accepts one image field named "file", up to 5 MB. */
export const imageUpload = multer({
  storage,
  limits: { fileSize: LIMITS.UPLOAD_BYTES },
  fileFilter(_req, file, done) {
    done(file.mimetype.startsWith("image/") ? null : badRequest("Upload an image file."), true);
  },
}).single("file");
