import { Request, Response } from "express";
const BlogTag = require("../Module/blogTag");

export const createBlogTag = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, status, metaTitle, metaDescription } = req.body || {};
    if (!name || !slug) return res.status(400).json({ success: false, message: "name and slug are required" });
    const exists = await BlogTag.findOne({ $or: [{ name }, { slug }] });
    if (exists) return res.status(409).json({ success: false, message: "Tag with same name or slug already exists" });

    const doc = new BlogTag({ name, slug, description, status, metaTitle, metaDescription });
    await doc.save();
    res.status(201).json({ success: true, tag: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getBlogTags = async (_req: Request, res: Response) => {
  try {
    const tags = await BlogTag.find().sort({ name: 1 });
    res.status(200).json({ success: true, tags });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const updateBlogTag = async (req: Request, res: Response) => {
  try {
    const updated = await BlogTag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Tag not found' });
    res.status(200).json({ success: true, tag: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

export const deleteBlogTag = async (req: Request, res: Response) => {
  try {
    const deleted = await BlogTag.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Tag not found' });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};


