import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import dotenv from "dotenv";

dotenv.config();

const UPLOAD_DIR = path.resolve("uploads");
const MAX_SIZE = parseInt(process.env.MAX_SIZE_MB || "2") * 1024 * 1024;
const uploadRouter = express.Router();

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${randomUUID()}${ext}`;
    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  const isValid = ["image/jpeg", "image/png"].includes(file.mimetype);
  cb(null, isValid);
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter,
});

uploadRouter.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(422).json({ error: "Invalid file type or size." });
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    file.filename
  }`;
  res.json({ url: fileUrl });
});

uploadRouter.get("/storage", (req, res) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: "Failed to read uploads." });

    let total = 0;
    files.forEach((file) => {
      const stats = fs.statSync(path.join(UPLOAD_DIR, file));
      total += stats.size;
    });

    res.json({ totalBytes: total });
  });
});


export default uploadRouter;