import { Request, Response } from "express";
const BlogCategory = require("../Module/blogCategory");

export const createBlogCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, status, parentId, icon, isDefault, isFeatured, metaTitle, metaDescription } = req.body || {};
    if (!name || !slug) {
      return res.status(400).json({ success: false, message: "name and slug are required" });
    }

    const exists = await BlogCategory.findOne({ $or: [{ name }, { slug }] });
    if (exists) {
      return res.status(409).json({ success: false, message: "Category with same name or slug already exists" });
    }

    const doc = new BlogCategory({ name, slug, description, status, parentId, icon, isDefault, isFeatured, metaTitle, metaDescription });
    await doc.save();
    res.status(201).json({ success: true, category: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getBlogCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await BlogCategory.find().sort({ name: 1 });
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const updateBlogCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as any;
    const update: any = {};
    const allowed = [
      "name",
      "slug",
      "description",
      "status",
      "parentId",
      "icon",
      "isDefault",
      "isFeatured",
      "metaTitle",
      "metaDescription",
    ];
    allowed.forEach((k) => {
      if (typeof (req.body as any)[k] !== "undefined") update[k] = (req.body as any)[k];
    });

    const doc = await BlogCategory.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, category: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


