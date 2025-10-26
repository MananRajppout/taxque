import { Request, Response } from "express";
const Application = require("../Module/Application");

export const createApplication = async (req: Request, res: Response) => {
  try {
    const {
      jobId,
      fullName,
      email,
      phone,
      address,
      resume,
      experienceYears,
      currentJobTitle,
      expectedSalary,
      noticePeriod,
    } = req.body;

    // Validate required fields
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ message: "Full name is required" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }
    // Phone and resume are recommended but not strictly required
    if (!phone || !phone.trim()) {
      console.log("Warning: Phone number not provided");
    }
    if (!resume || !resume.trim() || resume === "No resume uploaded") {
      console.log("Warning: Resume not uploaded, proceeding without resume");
    }

    const newApplication = new Application({
      jobId,
      fullName: fullName?.trim(),
      email: email?.trim(),
      phone: phone?.trim() || "",
      address: address?.trim() || "",
      resume: resume?.trim() || "No resume uploaded",
      experienceYears: experienceYears?.trim() || "",
      currentJobTitle: currentJobTitle?.trim() || "",
      expectedSalary: expectedSalary?.trim() || "",
      noticePeriod: noticePeriod?.trim() || "",
    });

    const savedApplication = await newApplication.save();
    
    res.status(201).json({
      success: true,
      message: "Application created successfully",
      application: savedApplication
    });
  } catch (error: any) {
    console.error("Error creating application:", error);
    res.status(500).json({ 
      success: false,
      message: "Error creating application", 
      error: error.message 
    });
  }
};

export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.query;
    const filter = jobId ? { jobId } : {};

    const applications = await Application.find(filter);
    res.status(200).json(applications);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching application", error: error.message });
  }
};

export const updateApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Reviewed", "Shortlisted", "Rejected", "Hired"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(updatedApplication);
  } catch (error: any) {
    res.status(500).json({ message: "Error updating application", error: error.message });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedApplication = await Application.findByIdAndDelete(id);

    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting application", error: error.message });
  }
  };