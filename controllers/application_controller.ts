import { Request, Response } from 'express';
import Job from '../models/jobsModel'; 
import Application from '../models/applicationModel'; 

const job = new Job(); 
const application = new Application();

export const createApplicationController = async (req: Request, res: Response): Promise<void> => {
  const { job_obj, application_obj } = req.body;  // Extract data from the request body

  try {
    // Create Job and Application using Mongoose
    await job.createJob(job_obj); 
    await application.createApplication(application_obj);

    // Send response back once the job and application are created
    res.status(200).json({ message: "Successfully Created Application" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error: Could not create application\n` });
  }
};
