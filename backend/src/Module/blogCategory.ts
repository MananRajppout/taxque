import mongoose from "mongoose";

const BlogCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    status: { type: String, enum: ["Published", "Draft"], default: "Published" },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "BlogCategory", default: null },
    icon: { type: String },
    isDefault: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogCategory", BlogCategorySchema);


