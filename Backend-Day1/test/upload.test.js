import request from "supertest";
import express from "express";
import uploadRouter from "../routes/upload.js";
import path from "path";
import fs from "fs";

// Set up express app
const app = express();
app.use("/api", uploadRouter);

// ✅ Error handler added only for test environment
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "File too large" });
  }
  res.status(500).json({ error: err.message || "Something went wrong" });
});

// Utility function to verify file existence
const fileExists = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
};

describe("POST /api/upload", () => {
  it("should upload a valid image", async () => {
    const smallImagePath = path.resolve("test-images/small.png");
    fileExists(smallImagePath);

    const res = await request(app)
      .post("/api/upload")
      .attach("image", smallImagePath);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("url");
    expect(res.body.url).toMatch(/\/uploads\/.*\.(png|jpg|jpeg)$/);
  });

  it("should reject image > 2MB", async () => {
    const largeImagePath = path.resolve("test-images/large.jpg");
    fileExists(largeImagePath);

    const res = await request(app)
      .post("/api/upload")
      .attach("image", largeImagePath);

    expect(res.status).toBe(413); // Error code from our error handler
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("File too large");
  });
});
