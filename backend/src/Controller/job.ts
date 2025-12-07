const Job = require("../Module/job")
import { Request, Response } from "express";


export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ success: true, data: job });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find all jobs - ensure all fields including aboutThisRole and keyResponsibilities are returned
    const jobs = await Job.find().lean();
    // Ensure aboutThisRole and keyResponsibilities are always present in the response
    const jobsWithFields = jobs.map((job: any) => ({
      ...job,
      aboutThisRole: job.aboutThisRole !== undefined ? job.aboutThisRole : null,
      keyResponsibilities: job.keyResponsibilities !== undefined ? job.keyResponsibilities : null,
    }));
    res.status(200).json(jobsWithFields);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id).lean();
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }
    // Ensure aboutThisRole and keyResponsibilities are always present in the response
    const jobWithFields = {
      ...job,
      aboutThisRole: job.aboutThisRole !== undefined ? job.aboutThisRole : null,
      keyResponsibilities: job.keyResponsibilities !== undefined ? job.keyResponsibilities : null,
    };
    res.status(200).json(jobWithFields);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find the job first to ensure it exists
    const existingJob = await Job.findById(req.params.id);
    if (!existingJob) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    // Update all fields including aboutThisRole and keyResponsibilities
    // Explicitly set all fields from req.body to ensure they're saved
    Object.keys(req.body).forEach((key) => {
      existingJob.set(key, req.body[key]);
    });

    // Save the updated job
    await existingJob.save();

    // Get the updated job as a plain object
    const updatedJob = existingJob.toObject();

    // Ensure aboutThisRole and keyResponsibilities are always present in the response
    const jobWithFields = {
      ...updatedJob,
      aboutThisRole: updatedJob.aboutThisRole !== undefined ? updatedJob.aboutThisRole : null,
      keyResponsibilities: updatedJob.keyResponsibilities !== undefined ? updatedJob.keyResponsibilities : null,
    };

    res.status(200).json({ success: true, data: jobWithFields });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};