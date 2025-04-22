import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import uploadRouter from "./routes/upload.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploads folder as read-only
app.use('/uploads', express.static(path.resolve("uploads"), { fallthrough: false }));

// Routes
app.use("/api", uploadRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
