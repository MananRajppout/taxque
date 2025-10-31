import mongoose from "mongoose";

const BlogTagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    status: { type: String, enum: ["Published", "Draft"], default: "Published" },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogTag", BlogTagSchema);



