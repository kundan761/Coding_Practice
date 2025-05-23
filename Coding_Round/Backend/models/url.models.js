import mongoose from "mongoose";
const UrlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    hitCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", UrlSchema);
export default Url;
