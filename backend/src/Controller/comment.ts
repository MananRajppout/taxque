import { Request, Response } from "express";
const Comment = require("../Module/comment");
const Blog = require("../Module/blog");

// Add a comment to a blog
export const AddComment = async (req: Request, res: Response) => {
  try {
    const { blogId, name, email, comment } = req.body;

    if (!blogId || !comment) {
      return res.status(400).json({ 
        success: false, 
        message: "Blog ID and comment are required" 
      });
    }

    // Check if blog exists and allows comments
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Blog not found" 
      });
    }

    if (!blog.allowComments) {
      return res.status(403).json({ 
        success: false, 
        message: "Comments are disabled for this blog" 
      });
    }

    const newComment = new Comment({
      blogId,
      name: name || "Guest",
      email: email || "",
      comment,
    });

    await newComment.save();

    res.status(201).json({ 
      success: true, 
      message: "Comment submitted successfully.",
      comment: newComment 
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: error 
    });
  }
};

// Get comments by blog slug
export const GetBlogCommentsBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ 
        success: false, 
        message: "Blog slug is required" 
      });
    }

    // Find blog by slug
    const blog = await Blog.findOne({ Slug: slug });
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Blog not found" 
      });
    }

    const comments = await Comment.find({ 
      blogId: blog._id
    })
      .sort({ date: -1 }) // Most recent first
      .exec();

    res.status(200).json({ 
      success: true, 
      comments 
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: error 
    });
  }
};

