import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  Slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  metaTitle: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
  date: String,
  category: String,
  blogText: [
    {
      title: {
        type: String,
        required: true,
      },
      summarys: [{ summary: String }],
    },
  ],
  tags: [{ type: String }],
  status: {
    type: String,
    enum: ["Published", "Draft"],
    default: "Published",
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
